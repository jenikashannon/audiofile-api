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
		{
			id: 2,
			user_id: 1,
			name: "secy",
			empty_crate: false,
		},
		{
			id: 3,
			user_id: 1,
			name: "loser",
			empty_crate: false,
		},
		{
			id: 4,
			user_id: 1,
			name: "hahahok",
			empty_crate: false,
		},
		{
			id: 5,
			user_id: 1,
			name: "ONE MORE TIME",
			empty_crate: false,
		},
		{
			id: 6,
			user_id: 2,
			name: "so done",
			empty_crate: false,
		},
		{
			id: 7,
			user_id: 2,
			name: "with it allll",
			empty_crate: false,
		},
		{
			id: 8,
			user_id: 2,
			name: "E TIME",
			empty_crate: false,
		},
	]);
};
