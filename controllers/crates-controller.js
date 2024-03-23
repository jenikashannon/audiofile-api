const knex = require("knex")(require("../knexfile"));
const uniqid = require("uniqid");
const spotifyController = require("./spotify-controller");

async function addAlbum(req, res) {
	const { album_id } = req.body;
	const crate_id = req.params.crate_id;

	try {
		await knex("crate_album").insert({ crate_id, album_id });
		res.status(201).json(`Album added, successfully`);
	} catch (error) {
		console.log(error);
	}
}

async function create(req, res) {
	const newId = uniqid();

	const newCrate = {
		id: newId,
		...req.body,
	};

	try {
		await knex("crate").insert(newCrate);

		// get created crate
		const createdCrate = await await knex("crate").where({ id: newId }).first();

		res.status(201).json(createdCrate);
	} catch (error) {
		console.log(error);
		res.staus(500).json(`Error creating crate`);
	}
}

async function findAlbums(crate_id, user_id, type) {
	const albumIds = await knex("crate_album")
		.where({ crate_id })
		.distinct("album_id")
		.pluck("album_id");

	const albums = await spotifyController.getAlbums(albumIds, user_id);

	if (type === "full") {
		return albums;
	}

	const names = albums.map((album) => {
		return album.name;
	});

	let tracks = [];
	let artists = [];

	albums.forEach((album) => {
		album.artists.forEach((artist) => {
			if (!artists.includes(artist)) {
				artists.push(artist);
			}
		});

		album.tracks.forEach((track) => {
			tracks.push(track.name);

			track.artists.forEach((artist) => {
				if (!artists.includes(artist)) {
					artists.push(artist);
				}
			});
		});
	});

	return { names, tracks, artists };
}

async function findAll(req, res) {
	const user_id = req.query.user_id;

	const crates = await knex("crate")
		.where({ user_id })
		.orderBy("created_at", "asc");

	if (!crates) {
		return res.status(404);
	}

	const cratesEnhanced = await Promise.all(
		crates.map(async (crate) => {
			// get album, track, and artist names
			const {
				names: albums,
				tracks,
				artists,
			} = await findAlbums(crate.id, user_id);

			const album_count = albums.length;

			return { ...crate, albums, tracks, artists, album_count };
		})
	);

	res.status(200).json(cratesEnhanced);
}

async function findOne(req, res) {
	const crate_id = req.params.crate_id;
	const user_id = req.query.user_id;

	try {
		const crate = await knex("crate").where({ id: crate_id }).first();
		const albums = await findAlbums(crate_id, user_id, "full");

		crate.albums = albums;

		res.status(200).json(crate);
	} catch (error) {
		console.log(error);
		res.status(500).json(`Error retrieving crate.`);
	}
}

async function remove(req, res) {
	const crate_id = req.params.crate_id;

	try {
		await knex("crate").where({ id: crate_id }).del();

		res.status(204).json(`Crate deleted successfully.`);
	} catch (error) {
		console.log(error);
		res.status(500).json(`Error deleting crate with id: ${crate_id}`);
	}
}

async function removeAlbum(req, res) {
	const crate_id = req.params.crate_id;
	const album_id = req.params.album_id;

	try {
		await knex("crate_album").where({ crate_id, album_id }).del();
		res.status(203).json(`Album deleted successfully.`);
	} catch (error) {
		console.log(error);
		res.status(500);
	}
}

async function update(req, res) {
	const crate_id = req.params.crate_id;

	try {
		await knex("crate").where({ id: crate_id }).update(req.body);
		res.status(200).json(`Crate sucessfully updated.`);
	} catch (error) {
		res.status(500).json(`Error updating crate name.`);
		console.log(error);
	}
}

module.exports = {
	findAll,
	create,
	remove,
	findOne,
	addAlbum,
	removeAlbum,
	update,
};

////// utility functions //////

async function getAlbumCount(crates) {
	const updatedCrates = await Promise.all(
		crates.map(async (crate) => {
			const album_count = await knex("crate_album")
				.where({ crate_id: crate.id })
				.countDistinct("album_id as album_count")
				.first();

			const updatedCrate = { ...crate, ...album_count };
			return updatedCrate;
		})
	);

	return updatedCrates;
}
