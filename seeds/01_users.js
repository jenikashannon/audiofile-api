/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("user").del();
	await knex("user").insert([
		{
			id: "1nmfd34zlu7amjrw",
			email: "jenikashannon@pm.me",
			password: "passpass",
			product: "premium",
			access_token:
				"BQBq6OemI780VJ8lqAnGtLcAEyuBSHFxd-QrkyU6aVbgmUhvP4zwgVxBH700FSZzL-oTJkPJwhlgFRV2WDkEwnrhR5OAyees1PKQ91bS9d0FWCs0NXTZYEoD6bRblDUiGCYHRFl23h97CVYWlQEalUvAoKCu3el22UpgSbO_hEXSp893UjSCnRczxS5MNBl8P2Ithuq0KXgyq5MwtjIhk88qtBIcoGr18gFD0RQptykTaMcDQspg7CR1paVCBb3JdzeACw5x0zn5J270sa6cOwgzfxczDw-hNyvxEhErfhdSZ53jlFjKtsFDHA",
			refresh_token:
				"AQDreNd1S0LDplQM_WVS8FyrL3f7yzFuw18qd0gvN-XL6P5msgrEyNn0c3Fu-2ztMPtOTyQg4La27p4YkeLFt2XJbFm_motvXxawPdb7wUbnMovTs_NGHyCGUrmQtRnG51k",
			expires_at: "1711392148333",
		},
	]);
};
