const express = require("express");
const cors = require("cors");
require("dotenv").config();

const jwtMiddleware = require("./middleware/jwt-middleware.js");
const spotiftMiddleware = require("./middleware/spotify-middleware.js");

const app = express();

const PORT = process.env.PORT ?? 1700;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT", "CONNECT");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	next();
});

const spotifyRoutes = require("./routes/spotify-routes.js");
app.use(
	"/api/spotify",
	jwtMiddleware.verifyToken,
	spotiftMiddleware.verifySpotifyAuth,
	spotifyRoutes
);

const usersRoutes = require("./routes/users-routes.js");
app.use("/api/users", usersRoutes);

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
