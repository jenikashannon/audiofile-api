const express = require(express);
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT ?? 1700;

app.use(cors);
app.use(express.json());
