const knex = require("knex")(require("../knexfile"));
const uniqid = require("uniqid");

async function findAll(req, res) {
	const user_id = req.params.user_id;

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

async function create(req, res) {
	newId = uniqid();

	const newCrate = {
		id: newId,
		...req.body,
	};

	await knex("crate").insert(newCrate);

	// get created crate
	const createdCrate = await await knex("crate").where({ id: newId }).first();
	console.log(createdCrate);

	res.status(201).json(createdCrate);
}

async function findAlbums(crate_id) {
	const albums = await knex("crates_albums")
		.where({ crate_id })
		.distinct("album_id");
}

module.exports = { findAll, create };

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
