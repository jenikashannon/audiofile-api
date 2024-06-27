require("dotenv").config();
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	client: "mysql2",
	connection: {
		host: process.env.STACKHERO_MYSQL_HOST,
		port: process.env.STACKHERO_MYSQL_PORT,
		password: process.env.STACKHERO_MYSQL_ROOT_PASSWORD,
		user: "root",
		database: "root",
		ssl: {},
	},
};
