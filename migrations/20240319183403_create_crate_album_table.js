/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("crate_album", (table) => {
		table
			.integer("crate_id")
			.unsigned()
			.references("crate.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table.string("album_id").notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("crate_album");
};
