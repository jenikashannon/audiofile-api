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
			username: "iamdichotomi",
			email: "jenikashannon@pm.me",
			password: "passpass",
			spotify_code: "will figure this out",
		},
	]);
};
