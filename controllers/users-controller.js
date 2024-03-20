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

		// set expires_at
		const expires_at = Date.now() + expires_in;

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
			expires_at,
		};

		await knex("user").insert(newUser);

		// find new user_id
		const addedUser = await knex("user")
			.where({ access_token })
			.select("id")
			.first();

		// create default crate
		await knex("crate").insert({
			user_id: addedUser.id,
			name: "my first crate",
			empty_crate: true,
			default_crate: true,
		});

		res.status(201).json(addedUser);
	} catch (error) {
		res.status(500);
	}
}

module.exports = { create };

async function refreshToken(refresh_token) {
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
