/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("user", (table) => {
		table.string("id").primary().notNullable();
		table.string("email").notNullable();
		table.string("password").notNullable();
		table.string("product");
		table.string("access_token", 400);
		table.string("refresh_token", 400);
		table.string("expires_at");
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table
			.timestamp("updated_at")
			.defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("user");
};
