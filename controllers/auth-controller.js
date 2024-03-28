const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../knexfile"));
const uniqid = require("uniqid");

async function addUser(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json(`Please enter all fields`);
	}

	// check to see if user already exists
	formattedEmail = email.toLowerCase();

	try {
		userEmails = await knex("user").pluck("email");

		if (userEmails.includes(formattedEmail)) {
			return res.status(400).json(`Email already registered, try logging in`);
		}
	} catch (error) {
		res.status(400).json(`Error registering user: ${error}`);
	}

	const encryptedPassword = bcrypt.hashSync(password);

	const newUser = {
		id: uniqid(),
		email: formattedEmail,
		password: encryptedPassword,
	};

	try {
		await knex("user").insert(newUser);

		// create default crate
		const newCrateId = uniqid();

		await knex("crate").insert({
			id: newCrateId,
			user_id: newUser.id,
			name: "my first crate",
			empty_crate: true,
			default_crate: true,
		});

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

	if (!isPasswordValid) {
		return res.status(400).json(`Invalid password`);
	}

	const token = jwt.sign({ user_id: user.id }, process.env.JWT_KEY);

	res.status(200).json({ token });
}

module.exports = { addUser, login };
