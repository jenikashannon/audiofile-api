const express = require("express");

const router = express.Router();

const cratesController = require("../controllers/crates-controller");

router.route("/").get(cratesController.findAll).post(cratesController.create);

router
	.route("/:crate_id")
	.get(cratesController.findOne)
	.delete(cratesController.remove)
	.post(cratesController.addAlbum);

router.route("/:crate_id/:album_id").delete(cratesController.removeAlbum);

module.exports = router;
