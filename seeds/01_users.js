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
			product: "premium",
			access_token:
				"BQBq6OemI780VJ8lqAnGtLcAEyuBSHFxd-QrkyU6aVbgmUhvP4zwgVxBH700FSZzL-oTJkPJwhlgFRV2WDkEwnrhR5OAyees1PKQ91bS9d0FWCs0NXTZYEoD6bRblDUiGCYHRFl23h97CVYWlQEalUvAoKCu3el22UpgSbO_hEXSp893UjSCnRczxS5MNBl8P2Ithuq0KXgyq5MwtjIhk88qtBIcoGr18gFD0RQptykTaMcDQspg7CR1paVCBb3JdzeACw5x0zn5J270sa6cOwgzfxczDw-hNyvxEhErfhdSZ53jlFjKtsFDHA",
			refresh_token:
				"AQDreNd1S0LDplQM_WVS8FyrL3f7yzFuw18qd0gvN-XL6P5msgrEyNn0c3Fu-2ztMPtOTyQg4La27p4YkeLFt2XJbFm_motvXxawPdb7wUbnMovTs_NGHyCGUrmQtRnG51k",
			expires_at: "1711392148333",
		},
		{
			id: 2,
			email: "jenikashanadsfnon@pm.me",
			product: "premium",
			access_token:
				"BQD_uTJAV5APKIasdfUSXqAHmKWfgwUGLk9i1f8F-AxkmxtpW__c0ZlNzXJH5k3655828v_qOBQY1p6cJuahrxA2Z6-MyJNWtt_xXBdZEEVCf-X_9xPeeicLJcDtsMiE-bRVmH-mlL3BRcczpq3yWW6WVKaBUjk5qPaJbRKyaTF5OYlM3FsezDLHAhY1dbSoNlJcXaI9jDdqb62MKALWmmCT6TR15PlZ5AqXijoAwPeqElTfDMp05tiynRYj8JUDLWXgd97Uq_9VaYRL-faZ9LPlBlSWwZPeqR51ugSvPLMqYLKMpjdYs3QfpX4owg",
			refresh_token:
				"AQBrn3j6v7mPasdfeCZny37qHR_TcdW-wcFlji94hJOOITFQmCRB7nwIneRO74gLDQXzw9OgdD-rDSmy3Wq3PAdBw5Jqts3g1NeYo3Xvb92yRBUieo9tgTK8BOGWZ1QWmD-ItGw",
			expires_at: "1710959210015",
		},
	]);
};
