const spotifyController = require("../controllers/spotify-controller.js");

async function verifySpotifyAuth(req, res, next) {
	const user_id = req.user_id;

	try {
		// check to see if Spotify authorized
		isSpotifyAuthorized = await spotifyController.checkSpotifyAuth(user_id);

		if (!isSpotifyAuthorized) {
			return res.status(400).json(`authorize on spotify`);
		}

		next();
	} catch (error) {
		res.status(401).send("error, please try again");
		// console.log(error);
	}
}

module.exports = { verifySpotifyAuth };
