/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("crate", (table) => {
		table.string("id").primary().notNullable();
		table
			.string("user_id")
			.references("user.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE")
			.notNullable();
		table.string("name").notNullable();
		table
			.string("cover_art")
			.defaultTo("http://localhost:1700/images/crate.svg");
		table.boolean("default_crate").notNullable().defaultTo(false);
		table.boolean("empty_crate").notNullable().defaultTo(true);
		table.boolean("pinned_crate").notNullable().defaultTo(false);
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
