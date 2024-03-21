const knex = require("knex")(require("../knexfile"));
const uniqid = require("uniqid");
const spotifyController = require("./spotify-controller");

async function create(req, res) {
	newId = uniqid();

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

async function findAll(req, res) {
	const user_id = req.query.user_id;
	console.log(user_id);

	const crates = await knex("crate")
		.where({ user_id })
		.orderBy("created_at", "asc");

	if (!crates) {
		return res.status(404);
	}

	// get album count
	const cratesEnhanced = await getAlbumCount(crates);
	res.status(200).json(cratesEnhanced);
}

async function findOne(req, res) {
	const id = req.params.crate_id;

	try {
		const crate = await knex("crate").where({ id });
		const albums = await findAlbums(id); // finish thisssssss
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

async function findAlbums(crate_id) {
	const albumIds = await knex("crate_album")
		.where({ crate_id })
		.distinct("album_id");

	console.log(albumIds);
	const albums = await spotifyController.getAlbums(albumIds);
}

module.exports = { findAll, create, remove, findOne };

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
