const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users-controller");

router.route("/createUser").get(usersController.create);

module.exports = router;
