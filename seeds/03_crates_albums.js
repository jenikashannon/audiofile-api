/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("crate_album").del();
	await knex("crate_album").insert([
		{
			crate_id: "asdlfjcj",
			album_id: "3Dz3wzC43T88VbJCRPDIAP",
		},
		{
			crate_id: "asdlfjcj",
			album_id: "23dKNZpiadggKHrQgHLi3L",
		},
	]);
};
