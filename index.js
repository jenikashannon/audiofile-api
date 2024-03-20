const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT ?? 1700;

app.use(cors());
app.use(express.json());

app.use((_req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT", "CONNECT");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
});

const spotifyRoutes = require("./routes/spotify-routes.js");
app.use("/api/spotify", spotifyRoutes);

const userRoutes = require("./routes/user-routes.js");
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
