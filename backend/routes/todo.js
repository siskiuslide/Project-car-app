const express = require("express");
const todoController = require("../controllers/todo");

const router = express.Router();
router.route("/").get(todoController.getAllTodos).post(todoController.createTodo).delete(todoController.deleteTodo);

module.exports = router;
