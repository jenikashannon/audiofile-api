/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("crate").del();
	await knex("crate").insert([
		{
			id: "lueomqz424",
			user_id: "1nmfd34zlu7amjrw",
			name: "hear jenika sing & rap",
			cover_art:
				"https://audiofile-backend-fab4f9e38733.herokuapp.com/images/crate.svg",
			default_crate: 0,
			empty_crate: 0,
			pinned_crate: 0,
		},
		{
			id: "1nmfd34zlu7amjsa",
			user_id: "1nmfd34zlu7amjrw",
			name: "2019 obsessions.",
			cover_art:
				"https://audiofile-backend-fab4f9e38733.herokuapp.com/images/crate.svg",
			default_crate: 0,
			empty_crate: 0,
			pinned_crate: 0,
		},
		{
			id: "lu7nraoy",
			user_id: "1nmfd34zlu7amjrw",
			name: "2020 obsessions.",
			cover_art:
				"https://audiofile-backend-fab4f9e38733.herokuapp.com/images/crate.svg",
			default_crate: 0,
			empty_crate: 0,
			pinned_crate: 0,
		},
		{
			id: "luah0cr6",
			user_id: "1nmfd34zlu7amjrw",
			name: "pinned crate",
			cover_art:
				"https://audiofile-backend-fab4f9e38733.herokuapp.com/images/crate.svg",
			default_crate: 0,
			empty_crate: 0,
			pinned_crate: 1,
		},
		{
			id: "lueomqz4",
			user_id: "1nmfdnhjlueo29e4",
			name: "hear jenika sing & rap",
			cover_art:
				"https://audiofile-backend-fab4f9e38733.herokuapp.com/images/crate.svg",
			default_crate: 0,
			empty_crate: 0,
			pinned_crate: 0,
		},
	]);
};
