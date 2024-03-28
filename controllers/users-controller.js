const knex = require("knex")(require("../knexfile"));
const uniqid = require("uniqid");
const spotifyController = require("./spotify-controller");

async function create(req, res) {
	const code = req.query.code;

	try {
		// authorize with Spotify
		const { email, product, access_token, refresh_token, expires_at } =
			await spotifyController.getAccessToken(code);

		// add tokens to user in database

		res.status(201).json({ id: newUserId });
	} catch (error) {
		console.log(error);
		res.status(500).json(`Error creating user: ${error}`);
	}
}

module.exports = { create };
