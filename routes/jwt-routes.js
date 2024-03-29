const express = require("express");
const router = express.Router();

const jwtController = require("../controllers/jwt-controller");

router.route("/").post(jwtController.verifyToken);

module.exports = router;
