/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("crate").del();
	await knex("crate").insert([
		{
			id: "asdlfjcj",
			user_id: 1,
			name: "baby's first crate",
			empty_crate: false,
		},
		{
			id: "wasdfjcnd",
			user_id: 1,
			name: "secy",
			empty_crate: false,
		},
		{
			id: "eeeekjancekoaj",
			user_id: 1,
			name: "loser",
			empty_crate: false,
		},
		{
			id: "kljaenneid",
			user_id: 1,
			name: "hahahok",
			empty_crate: false,
		},
		{
			id: "weroioioioejn",
			user_id: 1,
			name: "ONE MORE TIME",
			empty_crate: false,
		},
		{
			id: "asdfasdfasdf",
			user_id: 2,
			name: "so done",
			empty_crate: false,
		},
		{
			id: "oineuvb",
			user_id: 2,
			name: "with it allll",
			empty_crate: false,
		},
		{
			id: "asdfieieiejnnnbgd",
			user_id: 2,
			name: "E TIME",
			empty_crate: false,
		},
	]);
};
