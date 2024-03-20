const knex = require("knex")(require("../knexfile"));

async function findAll(req, res) {
	const user_id = req.params.id;

	const crates = await knex("crate").where({ user_id });

	if (!crates) {
		return res.status(404);
	}

	// add album count
	crates.forEach(async (crate) => {
		crate.albumCount = await countAlbums(crate.id);
	});

	res.status(200).json(crates);
}

async function findAlbums(crate_id) {
	const albums = await knex("crates_albums")
		.where({ crate_id })
		.distinct("album_id");
}

module.exports = { findAll };

async function countAlbums(crate_id) {
	const numAlbums = await knex("crate_album")
		.where({ crate_id })
		.countDistinct("album_id")
		.first();

	return numAlbums["count(distinct `album_id`)"];
}
