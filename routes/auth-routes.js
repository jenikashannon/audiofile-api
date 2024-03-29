const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");
const jwtMiddleware = require("../middleware/jwt-middleware");

router.route("/signup").post(authController.addUser);
router.route("/login").post(authController.login);
router
	.route("/authorizeSpotify")
	.post(jwtMiddleware.verifyToken, authController.authorizeSpotify);

module.exports = router;
