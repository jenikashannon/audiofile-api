const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

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

// app.use(verifyToken);

function verifyToken(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(401).send("Please login");
	}

	// Parse the bearer token
	const authHeader = req.headers.authorization;
	const authToken = authHeader.split(" ")[1];

	// Verify the token
	try {
		const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
		req.user_id = decodedToken.user_id;
		next();
	} catch (error) {
		res.status(401).send("Invalid auth token");
		console.log(error);
	}
}

const spotifyRoutes = require("./routes/spotify-routes.js");
app.use("/api/spotify", verifyToken, spotifyRoutes);

const usersRoutes = require("./routes/users-routes.js");
app.use("/api/users", usersRoutes);

const cratesRoutes = require("./routes/crates-routes.js");
app.use("/api/crates", verifyToken, cratesRoutes);

const authRoutes = require("./routes/auth-routes.js");
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
