/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("crate").del();
	await knex("crate").insert([
		{
			id: "1nmfd34zlu7amjsa",
			user_id: "1nmfd34zlu7amjrw",
			name: "2019 obsessions",
			empty_crate: false,
			default_crate: false,
			pinned_crate: false,
		},
		{
			id: "lu7nraoy",
			user_id: "1nmfd34zlu7amjrw",
			name: "2020 obsessions",
			empty_crate: false,
			default_crate: false,
			pinned_crate: false,
		},
	]);
};
