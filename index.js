const express = require("express");

const jwtMiddleware = require("./middleware/jwt-middleware.js");
const spotiftMiddleware = require("./middleware/spotify-middleware.js");

const app = express();

const PORT = process.env.PORT ?? 1700;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type");

	if (req.method === "OPTIONS") {
		res.header(
			"Access-Control-Allow-Methods",
			"POST, PUT, PATCH, GET, DELETE",
			"CONNECT"
		);
		return res.status(200).json({});
	}

	next();
});

app.use(express.json());
app.use(express.static("public"));

const spotifyRoutes = require("./routes/spotify-routes.js");
app.use(
	"/api/spotify",
	jwtMiddleware.verifyToken,
	spotiftMiddleware.verifySpotifyAuth,
	spotifyRoutes
);

const cratesRoutes = require("./routes/crates-routes.js");
app.use(
	"/api/crates",
	jwtMiddleware.verifyToken,
	spotiftMiddleware.verifySpotifyAuth,
	cratesRoutes
);

const authRoutes = require("./routes/auth-routes.js");
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});

// "192.168.2.140",
