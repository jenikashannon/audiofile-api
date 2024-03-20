const express = require("express");

const router = express.Router();

const cratesController = require("../controllers/crates-controller");

router.route("/:id").get(cratesController.findAll);

module.exports = router;
