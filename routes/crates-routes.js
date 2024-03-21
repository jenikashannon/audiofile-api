const express = require("express");

const router = express.Router();

const cratesController = require("../controllers/crates-controller");

router
	.route("/:user_id")
	.get(cratesController.findAll)
	.post(cratesController.create);

router.route("/:user_id/:crate_id").delete(cratesController.remove);

module.exports = router;
