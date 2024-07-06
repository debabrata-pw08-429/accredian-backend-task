const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const referralRoutes = require("./routes/referralRoutes");

const app = express();
const PORT = process.env.SERVER_PORT || 8082;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use("/api", referralRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
