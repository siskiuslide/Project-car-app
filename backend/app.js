const express = require("express");
const bodyParser = require("body-parser"); //now seperate to express
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv").config;
dotenv({ path: "./config.env" });

const app = express();
app.use(bodyParser.json({ limit: "10kb" })); //allows json to be parsed in req.body
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
const DB = process.env.DATABASE;

mongoose.connect(DB).then((con) => {
  console.log("connected to mongodb");
});
const garageRoute = require("./routes/garage");
app.use("/garage", garageRoute);

module.exports = app;
