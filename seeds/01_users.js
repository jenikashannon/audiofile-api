/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("user").del();
	await knex("user").insert([
		{
			id: 1,
			product: "",
			email: "",
			access_token: "",
			refresh_token: "",
			expires_in: "",
		},
	]);
};
