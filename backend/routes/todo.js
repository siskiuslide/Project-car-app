const express = require("express");
const todoController = require("../controllers/todo");

const router = express.Router();
router.route("/").get(todoController.getAllTodos).post();

module.exports = router;
