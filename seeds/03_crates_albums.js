/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("crate_album").del();
	await knex("crate_album").insert([
		{ crate_id: "1nmfd34zlu7amjsa", album_id: "4KJGypBUe7ANibtri1msUe" },
		{ crate_id: "1nmfd34zlu7amjsa", album_id: "6tbaSZ6Q72kofaJtscUwFA" },
		{ crate_id: "1nmfd34zlu7amjsa", album_id: "3qCiiXddLzOGmofZt1oJBc" },
		{ crate_id: "1nmfd34zlu7amjsa", album_id: "23dKNZpiadggKHrQgHLi3L" },
		{ crate_id: "1nmfd34zlu7amjsa", album_id: "2fYhqwDWXjbpjaIJPEfKFw" },
		{ crate_id: "1nmfd34zlu7amjsa", album_id: "0S0KGZnfBGSIssfF54WSJh" },
		{ crate_id: "1nmfd34zlu7amjsa", album_id: "40L9yPrh6yD1ECI3ofNfPc" },
		{ crate_id: "1nmfd34zlu7amjsa", album_id: "1xoxPN22Cr7BmKnsUCqKoI" },
		{ crate_id: "1nmfd34zlu7amjsa", album_id: "5FQ4sOGqRWUA5wO20AwPcO" },
		{ crate_id: "1nmfd34zlu7amjsa", album_id: "1pmuUGKQdl3yIAIMZucjKu" },
		{ crate_id: "1nmfd34zlu7amjsa", album_id: "6KSvWFf4g4PrIldtchJsTC" },
		{ crate_id: "1nmfd34zlu7amjsa", album_id: "1vzMWJ7kExSHOLcFal27oD" },
		{ crate_id: "1nmfd34zlu7amjsa", album_id: "1eN0asiUp2OoMuRkI61cmm" },
		{ crate_id: "lu7nraoy", album_id: "3PuofR78j1BFBGBrNCCYUF" },
		{ crate_id: "lu7nraoy", album_id: "6VB0QoBXTlER1aYC27Ite8" },
		{ crate_id: "lu7nraoy", album_id: "3DB2RnzDwpcwQdXij6vLWI" },
		{ crate_id: "lu7nraoy", album_id: "0pMkbror5DyuBSl5yeUYTn" },
		{ crate_id: "lu7nraoy", album_id: "4Y9r8QQYroasHOYHUwCeSB" },
		{ crate_id: "lu7nraoy", album_id: "1nqEfgZI0n3TUcwL5395yI" },
		{ crate_id: "lu7nraoy", album_id: "1ga17JiadIfEdU2atHyimo" },
		{ crate_id: "lu7nraoy", album_id: "3vi20DRHkqv4HyVg9Rt9wC" },
		{ crate_id: "lu7nraoy", album_id: "2VdGX4c99Au3aGtR1HJAIm" },
		{ crate_id: "lu7nraoy", album_id: "42MQxlJENU0xJORW7byNNS" },
		{ crate_id: "lu7nraoy", album_id: "0QuumkXPKBWR7wOKUfqQ34" },
		{ crate_id: "lu7nraoy", album_id: "5sO5lVzpbxNYIN3si8JNdW" },
		{ crate_id: "lu7nraoy", album_id: "7x2mennGJ74CsnR6YMyZqy" },
		{ crate_id: "lu7nraoy", album_id: "3rqD2yUY7csjZc9gkz1wih" },
		{ crate_id: "luah0cr6", album_id: "5wtE5aLX5r7jOosmPhJhhk" },
		{ crate_id: "luah0cr6", album_id: "3RqO05jxT9YYgNtMdQmo8Z" },
		{ crate_id: "luah0cr6", album_id: "2ODvWsOgouMbaA5xf0RkJe" },
		{ crate_id: "lueomqz424", album_id: "2jgqxqo8mZ3bSCjic8RohQ" },
		{ crate_id: "lueomqz424", album_id: "3Dz3wzC43T88VbJCRPDIAP" },
	]);
};
