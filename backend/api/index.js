const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");
const Challenge = require("./models/challengeModel");

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Wordle Challenges API");
});

app.use("/api/challenge", require("./routes/challengeRoutes"));

app.listen(port, () => {
  console.log(`Node API app is running on port ${port}`);
});

module.exports = app;
