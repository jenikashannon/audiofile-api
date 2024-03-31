const knex = require("knex")(require("../knexfile"));
const spotifyController = require("./spotify-controller");

async function addAlbum(req, res) {
	const { album_id } = req.body;
	const crate_id = req.params.crate_id;
	const user_id = req.user_id;

	try {
		// check if album is already in crate
		const albumIds = await knex("crate_album")
			.where({ crate_id })
			.pluck("album_id");

		if (albumIds.includes(album_id)) {
			return res.status(200).json(`Album already in crate`);
		}

		await knex("crate_album").insert({ crate_id, album_id });
		updateDefaultCrate(user_id);

		res.status(201).json(`Album added successfully.`);
	} catch (error) {
		res.status(400).json(`Trouble adding album.`);
	}
}

async function create(req, res) {
	const id = req.body.id;
	const user_id = req.user_id;

	if (!req.body.name) {
		return res.status(400).json(`Please name your crate.`);
	}

	try {
		await knex("crate").insert({ ...req.body, user_id });

		updateDefaultCrate(user_id);

		// get created crate
		const createdCrate = await knex("crate").where({ id }).first();

		res.status(201).json(createdCrate);
	} catch (error) {
		console.log(error);
		res.staus(400).json(`Error creating crate`);
	}
}

async function findAll(req, res) {
	const user_id = req.user_id;
	const type = req.query.type;

	const crateIds = await knex("crate")
		.pluck("id")
		.where({ user_id })
		.orderBy("created_at", "asc");

	if (!crateIds) {
		return res.status(404);
	}

	// get album, track, and artist names for each crate
	const crates = await Promise.all(
		crateIds.map(async (crateId) => {
			return await getOneCrate(crateId, user_id, type);
		})
	);

	res.status(200).json(crates);
}

async function findOne(req, res) {
	const crate_id = req.params.crate_id;
	const user_id = req.user_id;

	try {
		const crate = await getOneCrate(crate_id, user_id);

		res.status(200).json(crate);
	} catch (error) {
		console.log(error);
		res.status(400).json(`Error retrieving crate.`);
	}
}

async function remove(req, res) {
	const crate_id = req.params.crate_id;
	try {
		await knex("crate").where({ id: crate_id }).del();

		res.status(200).json(`Crate permanently deleted.`);
	} catch (error) {
		console.log(error);
		res.status(400).json(`Error deleting crate.`);
	}
}

async function removeAlbum(req, res) {
	const crate_id = req.params.crate_id;
	const album_id = req.params.album_id;

	try {
		await knex("crate_album").where({ crate_id, album_id }).del();

		res.status(203).json(`Album(s) removed successfully.`);
	} catch (error) {
		console.log(error);
		res.status(400).json(`Problem removing album.`);
	}
}

async function togglePinned(req, res) {
	const id = req.params.crate_id;

	try {
		const crate = await knex("crate").where({ id }).first();

		if (!crate) {
			return res.status(400).json(`Crate not found.`);
		}

		await knex("crate")
			.where({ id })
			.update({ pinned_crate: !crate.pinned_crate });

		res.status(200).json("Crate pinned.");
	} catch (error) {
		console.log(error);
		res.status(400).json(`Error pinning crate.`);
	}
}

async function update(req, res) {
	const crate_id = req.params.crate_id;
	const user_id = req.user_id;
	const { name } = req.body;

	if (!name) {
		return res.status(400).json(`Please name your crate.`);
	}

	try {
		await knex("crate").where({ id: crate_id }).update({ name });

		updateDefaultCrate(user_id);

		res.status(200).json(`Crate renamed sucessfully.`);
	} catch (error) {
		res.status(400).json(`Error renaming crate.`);
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
	togglePinned,
	update,
};

///////////////////////////////
////// utility functions //////
///////////////////////////////

async function findAlbums(crate_id, user_id, type) {
	const albumIds = await knex("crate_album")
		.where({ crate_id })
		.distinct("album_id")
		.pluck("album_id");

	if (type === "album_ids") {
		return albumIds;
	}

	const albums = await spotifyController.getAlbums(albumIds, user_id);

	return albums;
}

async function updateDefaultCrate(user_id) {
	// check to see if there is a default crate
	const defaultCrate = await knex("crate").where({
		default_crate: true,
		user_id,
	});

	// if so, remove default
	if (defaultCrate) {
		await knex("crate")
			.where({ default_crate: true, user_id })
			.update({ default_crate: false });
	}
}

async function getOneCrate(crate_id, user_id, type) {
	try {
		// get crate from database
		const crate = await knex("crate").where({ id: crate_id }).first();

		// get album IDs from database and album details from Spotify
		const albums = await findAlbums(crate_id, user_id, type);
		crate.albums = albums;

		crate.album_count = albums.length;

		if (type === "album_ids") {
			return {
				id: crate.id,
				name: crate.name,
				albumIds: albums,
				album_count: crate.album_count,
			};
		}
		return crate;
	} catch (error) {
		console.log(error);
	}
}
