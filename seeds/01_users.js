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
			email: "jenikashannon@pm.me",
			product: "premium",
			access_token:
				"BQD_uTJAV5APKIUSXqAHmKWfgwUGLk9i1f8F-AxkmxtpW__c0ZlNzXJH5k3655828v_qOBQY1p6cJuahrxA2Z6-MyJNWtt_xXBdZEEVCf-X_9xPeeicLJcDtsMiE-bRVmH-mlL3BRcczpq3yWW6WVKaBUjk5qPaJbRKyaTF5OYlM3FsezDLHAhY1dbSoNlJcXaI9jDdqb62MKALWmmCT6TR15PlZ5AqXijoAwPeqElTfDMp05tiynRYj8JUDLWXgd97Uq_9VaYRL-faZ9LPlBlSWwZPeqR51ugSvPLMqYLKMpjdYs3QfpX4owg",
			refresh_token:
				"AQBrn3j6v7mPeCZny37qHR_TcdW-wcFlji94hJOOITFQmCRB7nwIneRO74gLDQXzw9OgdD-rDSmy3Wq3PAdBw5Jqts3g1NeYo3Xvb92yRBUieo9tgTK8BOGWZ1QWmD-ItGw",
			expires_at: "1710959210015",
		},
	]);
};
