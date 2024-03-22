/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("user").del();
	await knex("user").insert([
		{
			id: "gr7t11rqlu1nwwk4",
			email: "jenikashannon@pm.me",
			product: "premium",
			access_token:
				"BQBPiQdyPCkeLejarvxkM7aJDpwAqdB3Vd32pk0I2dHSbm23E2dqg5K3jUR-OOLKOiYqkquEtVCe4vs2j9GgVnG-H1pXwrWwVzwB-MXTQCBuFbR2LTq34bfe0U88lpfegxoZcla_-zraDtBYXjFqMq_lB0aUFkmxVx1ji-bltgH2NIhSsrYJECwVFQgbpQuDzkgwtZP0feDaVdsIKlq1LRSzYO0IeSMB_K6EtYgUkMVJ2Hpzgdf1krnvTn_eegM_nRu26P2KVwB1sAfVQ_d4z0oTu5D0g7bUXMoO2BK32UEUmv-zCnIoThJlZg",
			refresh_token:
				"AQBOXj9_WLDcVlFL_QsG9FJQLh74zFSY7Z5K3CVRgmV8jQcRtCtMs0tvDdhP4Ws0P-mD16TOwMC7Fy955XrtUrskLDlgGo2X5432BCmh6_pNCjkXQVXWqaTwRBmrzlADeAg",
			expires_at: "1711058753853",
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
