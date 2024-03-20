const knex = require("knex")(require("../knexfile"));

const axios = require("axios");

const baseUrl = "https://api.spotify.com/v1";
const auth = Buffer.from(
	process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
).toString("base64");

async function create(req, res) {
	const code = req.query.code;

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

		// get user email
		const responseUserInfo = await axios.get(`${baseUrl}/me`, {
			headers: { Authorization: `Bearer ${access_token}` },
		});
		const { email, product } = responseUserInfo.data;

		// create user in database
		const newUser = {
			email,
			product,
			access_token,
			refresh_token,
			expires_in,
		};

		await knex("user").insert(newUser);

		// return new user
		const addedUser = await knex("user")
			.where({ access_token })
			.select("id")
			.first();

		res.status(201).json(addedUser);
	} catch (error) {
		res.status(500);
	}
}

module.exports = { create };
