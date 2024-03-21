const baseUrl = "https://api.spotify.com/v1";

const axios = require("axios");

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

		// set expires_at
		const expires_at = Date.now() + expires_in * 1000;

		// get user email
		const responseUserInfo = await axios.get(`${baseUrl}/me`, {
			headers: { Authorization: `Bearer ${access_token}` },
		});

		const { email, product } = responseUserInfo.data;

		return {
			access_token,
			refresh_token,
			expires_at,
			email,
			product,
		};
	} catch (error) {
		console.log(error);
	}
}

async function refreshAccessToken(refresh_token) {
	const responseRefreshToken = await axios.post(
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
}

async function isAccessTokenValid(id) {
	const expires_at = await knex("user")
		.where({ id })
		.select("expires_at")
		.first();

	return expires_at > Date.now();
}

async function getAlbums(albumIds) {
	// put album ids into an array
	const ids = albumIds.map((albumId, index) => {
		return albumId.album_id;
	});

	// max 20 albums at a time, determine number of requests to Spotify required
	const numRequests = Math.ceil(ids.length / 20);
	let albums;

	for (i = 0; i < numRequests; i++) {
		const idString = ids.slice(i * 20, (i + 1) * 20).toString();
		console.log(idString);

		try {
			const response = axios.get(`${baseUrl}/albums?ids=${idString}`, {
				headers: { Authorization: `Bearer: ` },
			});
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = {
	getAccessToken,
	refreshAccessToken,
	isAccessTokenValid,
	getAlbums,
};
