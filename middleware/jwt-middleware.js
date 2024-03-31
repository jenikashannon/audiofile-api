const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
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
	}
}

module.exports = { verifyToken };
