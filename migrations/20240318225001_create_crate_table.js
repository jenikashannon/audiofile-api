/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("crate", (table) => {
		table.increments("id").primary();
		table
			.integer("user_id")
			.unsigned()
			.references("user.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table.string("name").notNullable();
		table
			.string("cover_art")
			.defaultTo("http://localhost:1700/images/crate.svg");
		table.boolean("empty_crate").notNullable();
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
	return knex.schema.dropTable("crate");
};
