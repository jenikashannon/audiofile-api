const express = require("express");

const router = express.Router();

const cratesController = require("../controllers/crates-controller");

router
	.route("/:user_id")
	.get(cratesController.findAll)
	.post(cratesController.create);

module.exports = router;
