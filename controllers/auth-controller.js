const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../knexfile"));
const uniqid = require("uniqid");

async function addUser(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json(`Please enter all fields`);
	}

	const encryptedPassword = bcrypt.hashSync(password);

	const newUser = {
		id: uniqid(),
		email,
		password: encryptedPassword,
	};

	try {
		await knex("user").insert(newUser);
		res.status(201).json(`New user registered successfully!`);
	} catch (error) {
		res.status(400).json(`Failed to register new user: ${error}`);
	}
}

async function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json(`Please enter all fields`);
	}

	const user = await knex("user").where({ email }).first();

	if (!user) {
		return res.status(400).json(`Invalid email`);
	}

	const isPasswordValid = bcrypt.compareSync(password, user.password);
}

module.exports = { addUser, login };
