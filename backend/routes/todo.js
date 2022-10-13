const express = require("express");
const todoController = require("../controllers/todo");

const router = express.router();
router.route("/").get().post();
