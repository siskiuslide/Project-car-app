const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config;
dotenv({ path: "./config.env" });
const garageRoute = require("./routes/garage");
const app = express();

const DB = process.env.DATABASE;

mongoose.connect(DB).then((con) => {
  console.log("connected to mongodb");
});
app.use("/garage", garageRoute);

module.exports = app;
