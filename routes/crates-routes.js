const express = require("express");

const router = express.Router();

const cratesController = require("../controllers/crates-controller");

router.route("/").get(cratesController.findAll).post(cratesController.create);

router
	.route("/:crate_id")
	.get(cratesController.findOne)
	.delete(cratesController.remove);

module.exports = router;
