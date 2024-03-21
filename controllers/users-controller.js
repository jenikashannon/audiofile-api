const knex = require("knex")(require("../knexfile"));
const uniqid = require("uniqid");
const spotifyController = require("./spotify-controller");

async function create(req, res) {
	const code = req.query.code;

	try {
		// authorize with Spotify
		const { email, product, access_token, refresh_token, expires_at } =
			await spotifyController.getAccessToken(code);

		// create user in database
		const newUserId = uniqid();

		const newUser = {
			id: newUserId,
			email,
			product,
			access_token,
			refresh_token,
			expires_at,
		};

		await knex("user").insert(newUser);

		// create default crate
		const newCrateId = uniqid();

		await knex("crate").insert({
			id: newCrateId,
			user_id: newUserId,
			name: "my first crate",
			empty_crate: true,
			default_crate: true,
		});

		res.status(201).json({ id: newUserId });
	} catch (error) {
		console.log(error);
		res.status(500).json(`Error creating user: ${error}`);
	}
}

module.exports = { create };
