const express = require("express");

const router = express.Router();

const spotifyController = require("../controllers/spotify-controller");

router.route("/search").get(spotifyController.search);
router.route("/save").put(spotifyController.saveAlbum);
router.route("/remove").delete(spotifyController.removeAlbum);

module.exports = router;
