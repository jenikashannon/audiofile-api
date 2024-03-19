/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("crate").del();
	await knex("crate").insert([
		{
			id: 1,
			user_id: 1,
			name: "baby's first crate",
			empty_crate: false,
		},
	]);
};
