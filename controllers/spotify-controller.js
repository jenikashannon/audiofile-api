const baseUrl = "https://api.spotify.com/v1";

const axios = require("axios");
const knex = require("knex")(require("../knexfile"));

const auth = Buffer.from(
	process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
).toString("base64");

async function getAccessToken(code) {
	try {
		// request access token from Spotify API
		const responseAccessToken = await axios.post(
			`https://accounts.spotify.com/api/token`,
			{
				grant_type: "authorization_code",
				code: code,
				redirect_uri: process.env.REDIRECT_URI,
			},
			{
				headers: {
					Authorization: `Basic ${auth}`,
					"content-type": "application/x-www-form-urlencoded",
				},
			}
		);
		const { access_token, refresh_token, expires_in } =
			responseAccessToken.data;

		// // set expires_at
		const expires_at = Date.now() + expires_in * 1000;

		// get user email & product
		const responseUserInfo = await axios.get(`${baseUrl}/me`, {
			headers: { Authorization: `Bearer ${access_token}` },
		});

		const { product } = responseUserInfo.data;

		return {
			access_token,
			refresh_token,
			expires_at,
			product,
		};
	} catch (error) {
		console.log(error.response.data);
	}
}

async function getAlbums(albumIds, user_id) {
	// get user token
	const access_token = await getValidToken(user_id);

	// max 20 albums at a time, determine number of requests to Spotify required
	const numRequests = Math.ceil(albumIds.length / 20);
	let albums = [];
	let albumsSaved = [];

	for (let i = 0; i < numRequests; i++) {
		const idString = albumIds.slice(i * 20, (i + 1) * 20).toString();

		// get albums
		try {
			const response = await axios.get(`${baseUrl}/albums?ids=${idString}`, {
				headers: { Authorization: `Bearer ${access_token}` },
			});
			albums = [...albums, ...formatAlbums(response.data.albums)];
		} catch (error) {
			console.log(error);
		}

		// determine which ones are saved
		const albumsSavedRequest = await getAlbumSaveSatus(idString, user_id);

		albumsSaved = [...albumsSaved, ...albumsSavedRequest];
	}

	albums.forEach((album, index) => {
		album.is_saved = albumsSaved[index];
	});

	return albums;
}

async function saveAlbum(req, res) {
	const { user_id } = req;
	const { album_id } = req.query;

	// get user token
	const access_token = await getValidToken(user_id);

	try {
		await axios.put(
			`${baseUrl}/me/albums?ids=${album_id}`,
			{},
			{
				headers: { Authorization: `Bearer ${access_token}` },
			}
		);

		return res.status(200).json(`Album saved to your Spotify library.`);
	} catch (error) {
		res.status(400).json(`Error saving album.`);
	}
}

async function removeAlbum(req, res) {
	const { user_id } = req;
	const { album_id } = req.query;

	// get user token
	const access_token = await getValidToken(user_id);

	try {
		await axios.delete(`${baseUrl}/me/albums?ids=${album_id}`, {
			headers: { Authorization: `Bearer ${access_token}` },
		});

		return res.status(200).json(`Album removed from your Spotify library.`);
	} catch (error) {
		res.status(400).json(`Error removing album.`);
	}
}

async function search(req, res) {
	const user_id = req.user_id;
	const term = req.query.term;

	// get user token
	const access_token = await getValidToken(user_id);

	try {
		const response = await axios.get(`${baseUrl}/search?q=${term}&type=album`, {
			headers: { Authorization: `Bearer ${access_token}` },
		});

		const albumIds = getAlbumIds(response.data.albums.items);
		const albums = await getAlbums(albumIds, user_id);

		res.status(200).json(albums);
	} catch (error) {
		res.status(400).json(`Error searching Spotify.`);
	}
}

async function triggerPlayback(uris) {
	const { user_id } = req;

	// get user token
	const access_token = await getValidToken(user_id);

	try {
		await axios.put(
			`${baseUrl}/me/player/play`,
			{ uris },
			{
				headers: { Authorization: `Bearer ${access_token}` },
			}
		);

		res.status(200).json(`Now playing on Spotify.`);
	} catch (error) {
		res.status(400).json(`Error playing on Spotify.`);
	}
}

module.exports = {
	checkSpotifyAuth,
	getAccessToken,
	getAlbums,
	saveAlbum,
	removeAlbum,
	search,
	triggerPlayback,
};

///////////////////////////////
////// utility functions //////
///////////////////////////////

function formatAlbums(albums) {
	const albumsFormatted = albums.map((album) => {
		const tracks = album.tracks.items.map((track) => {
			const trackArtists = track.artists.map((artist) => {
				return artist.name;
			});

			return {
				name: track.name,
				artists: trackArtists,
				duration_ms: track.duration_ms,
			};
		});

		const albumArtists = album.artists.map((artist) => {
			return artist.name;
		});

		let albumDuration = 0;

		tracks.forEach((track) => {
			albumDuration += track.duration_ms;
		});

		return {
			id: album.id,
			name: album.name,
			artists: albumArtists,
			image: album.images[1].url,
			release_date: album.release_date,
			tracks,
			duration_ms: albumDuration,
			uri: album.uri,
		};
	});

	return albumsFormatted;
}

function getAlbumIds(albums) {
	const albumIds = albums.map((album) => {
		return album.id;
	});

	return albumIds;
}

async function refreshAccessToken(refresh_token, id) {
	try {
		const response = await axios.post(
			`https://accounts.spotify.com/api/token`,
			{
				grant_type: "refresh_token",
				refresh_token: refresh_token,
				redirect_uri: process.env.REDIRECT_URI,
			},
			{
				headers: {
					Authorization: `Basic ${auth}`,
					"content-type": "application/x-www-form-urlencoded",
				},
			}
		);

		const { access_token, expires_in } = response.data;
		const expires_at = Date.now() + expires_in * 1000;

		// update tokens in database
		await knex("user").where({ id }).update({ access_token, expires_at });

		return access_token;
	} catch (error) {
		return null;
	}
}

async function getValidToken(id) {
	const { access_token, refresh_token, expires_at } = await knex("user")
		.where({ id })
		.first();

	// check to see if current access token has expired
	if (expires_at > Date.now()) {
		return access_token;
	}

	return refreshAccessToken(refresh_token, id);
}

async function checkSpotifyAuth(id) {
	const { access_token, refresh_token, expires_at } = await knex("user")
		.where({ id })
		.first();
	if (!access_token || !refresh_token || !expires_at) {
		return false;
	}
	const refresh = await refreshAccessToken(refresh_token, id);
	return refresh ? true : false;
}

async function getAlbumSaveSatus(idString, user_id) {
	// get user token
	const access_token = await getValidToken(user_id);

	// determine which albums are saved in user's Spotify library
	try {
		const response = await axios.get(
			`${baseUrl}/me/albums/contains?ids=${idString}`,
			{
				headers: { Authorization: `Bearer ${access_token}` },
			}
		);

		return response.data;
	} catch (error) {
		console.log(error);
	}
}
