const express = require("express");

const router = express.Router();

const spotifyController = require("../controllers/spotify-controller");

// router.route("/authorize").get(spotifyController);

// router.route("/callback").get(spotifyController);

module.exports = router;
