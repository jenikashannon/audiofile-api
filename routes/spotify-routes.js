const express = require("express");

const router = express.Router();

const spotifyController = require("../controllers/spotify-controller");

router.route("/search").get(spotifyController.search);

module.exports = router;
