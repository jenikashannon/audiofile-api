const knex = require("knex")(require("../knexfile"));
const spotifyController = require("./spotify-controller");

async function addAlbum(req, res) {
	const { album_id, user_id } = req.body;
	const crate_id = req.params.crate_id;

	try {
		await knex("crate_album").insert({ crate_id, album_id });
		updateDefaultCrate(user_id);

		res.status(201).json(`Album added, successfully`);
	} catch (error) {
		console.log(error);
	}
}

async function create(req, res) {
	const id = req.body.id;
	const user_id = req.user_id;

	try {
		await knex("crate").insert({ ...req.body, user_id });

		updateDefaultCrate(user_id);

		// get created crate
		const createdCrate = await knex("crate").where({ id }).first();

		res.status(201).json(createdCrate);
	} catch (error) {
		console.log(error);
		res.staus(500).json(`Error creating crate`);
	}
}

async function findAll(req, res) {
	const user_id = req.user_id;
	const type = req.query.type;

	if (type === "name") {
		const crateNames = await knex("crate")
			.where({ user_id })
			.select("id", "name");

		if (!crateNames) {
			return res.status(404);
		}

		const crateNamesEnhanced = await Promise.all(
			crateNames.map(async (crate) => {
				const albumIds = await findAlbums(crate.id, user_id, "ids");

				return {
					...crate,
					albumIds,
				};
			})
		);

		return res.status(200).json(crateNamesEnhanced);
	}

	const crates = await knex("crate")
		.where({ user_id })
		.orderBy("created_at", "asc");

	if (!crates) {
		return res.status(404);
	}

	// get album, track, and artist names for each crate
	const cratesEnhanced = await Promise.all(
		crates.map(async (crate) => {
			const {
				albumNames: albums,
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
	const user_id = req.user_id;

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

async function togglePinned(req, res) {
	const id = req.params.crate_id;
	console.log(id);
	try {
		const crate = await knex("crate").where({ id }).first();

		if (!crate) {
			return res.status(400).json(`Crate not found`);
		}

		await knex("crate")
			.where({ id })
			.update({ pinned_crate: !crate.pinned_crate });

		res.status(200).json("Pin status toggled");
	} catch (error) {
		console.log(error);
		res.status(500).json(`Error toggling pin status`);
	}
}

async function update(req, res) {
	const crate_id = req.params.crate_id;
	const user_id = req.user_id;
	const { name } = req.body;

	try {
		await knex("crate").where({ id: crate_id }).update({ name });
		updateDefaultCrate(user_id);
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

	const albums = await spotifyController.getAlbums(albumIds, user_id);

	if (type === "full") {
		return albums;
	}

	if (type === "ids") {
		return albums.map((album) => {
			return album.id;
		});
	}

	// extract album, track, and artist names
	const albumNames = albums.map((album) => {
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

	return { albumNames, tracks, artists };
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
