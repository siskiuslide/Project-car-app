const express = require("express");
const bodyParser = require("body-parser"); //now seperate to express
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv").config;
dotenv({ path: "./config.env" });

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10kb" })); //allows json to be parsed in req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
const DB = process.env.DATABASE;

mongoose.connect(DB).then((con) => {
  console.log("Connected to MongoDB");
});
const garageRoute = require("./routes/garage");
const expenseRoute = require("./routes/expenses");
const todoRoute = require("./routes/todo");
const serviceRoute = require("./routes/servicing");

app.use("/garage", garageRoute);
app.use("/expenses", expenseRoute);
app.use("/todo", todoRoute);
app.use("/service", serviceRoute);

module.exports = app;
