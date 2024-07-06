const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const referralRoutes = require("./routes/referralRoutes");

const app = express();
const PORT = process.env.SERVER_PORT || 8082;

app.use(bodyParser.json());

// Use routes
app.use("/api", referralRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
