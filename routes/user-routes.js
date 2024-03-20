const express = require("express");

const router = express.Router();

const userController = require("../controllers/user-controller");

router.route("/createUser").get(userController.create);

module.exports = router;
