const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT ?? 1700;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use((_req, res, next) => {
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT", "CONNECT");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
});

const spotifyRoutes = require("./routes/spotify-routes.js");
app.use("/api/spotify", spotifyRoutes);

const usersRoutes = require("./routes/users-routes.js");
app.use("/api/users", usersRoutes);

const cratesRoutes = require("./routes/crates-routes.js");
app.use("/api/crates", cratesRoutes);

const authRoutes = require("./routes/auth-routes.js");
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
