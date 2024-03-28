const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");

router.route("/signup").post(authController.addUser);
router.route("/login").post(authController.login);

module.exports = router;
