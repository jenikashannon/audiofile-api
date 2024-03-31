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
			email: "demo@example.com",
			password: "$2a$10$ZWpHp99kXz9sibhVY8WnHOOUrUB9MntnpNlVMJ9NHuNF.RIx2uiqO",
			product: "premium",
			access_token:
				"BQBLPQIPZGV0fBD1bNdhzTxHzKsFcjwmmMf0NqxtVUJKK-RPg5P7_HrFknOiu61_uGc1ohcTJnsKki0fo9yECnQHISpZftP3ngZt3gdw7ZR2kTD8ScklbHNkdc7q1o-xzwNvXR5vIHYuWttVBKOGzEuV5Ah_BnITLrqYAhcQ5Skat8TlIxZ4IUEch2yFEhJcANzedQgB0hzuvkAbrjQfGUO6nDlaJGbu7o4Dt0ZMKzP-IP2RYCjppv8ATpwoSMC70iq8pFB1ExeEio6N_fesjNP6ehr3VHW11pleJiujOvi0GTIi0gh0KX7vAg",
			refresh_token:
				"AQBuz-0tc9m7WqvZwi1xkmNZc-1Nd7A7F6RmD0YnJEvH_PvjPmDtoAYhZWLqhZCfSMjL4PhGv6P86S4AN-x5iPWMGWbWi8hvg3PwZ7KWADXXkh7cq79kQf4ehpMrgG16ZP0",
			expires_at: "1711841051727",
		},
		{
			id: "1nmfdnhjlueo29e4",
			email: "user@example.com",
			password: "$2a$10$tydGX8yHSBYNWqZWoliY8O4A/NuyewXPpUVz2t97JC9/ZNefTAyl2",
			product: "premium",
			access_token:
				"BQBLPQIPZGV0fBD1bNdhzTxHzKsFcjwmmMf0NqxtVUJKK-RPg5P7_HrFknOiu61_uGc1ohcTJnsKki0fo9yECnQHISpZftP3ngZt3gdw7ZR2kTD8ScklbHNkdc7q1o-xzwNvXR5vIHYuWttVBKOGzEuV5Ah_BnITLrqYAhcQ5Skat8TlIxZ4IUEch2yFEhJcANzedQgB0hzuvkAbrjQfGUO6nDlaJGbu7o4Dt0ZMKzP-IP2RYCjppv8ATpwoSMC70iq8pFB1ExeEio6N_fesjNP6ehr3VHW11pleJiujOvi0GTIi0gh0KX7vAg",
			refresh_token:
				"AQBuz-0tc9m7WqvZwi1xkmNZc-1Nd7A7F6RmD0YnJEvH_PvjPmDtoAYhZWLqhZCfSMjL4PhGv6P86S4AN-x5iPWMGWbWi8hvg3PwZ7KWADXXkh7cq79kQf4ehpMrgG16ZP0",
			expires_at: "1711841051727",
		},
	]);
};
