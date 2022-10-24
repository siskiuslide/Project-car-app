const catchAsync = require("../helpers/catchAsync");
const Todo = require("../models/todoModel");

exports.getAllTodos = catchAsync(async function (req, res, next) {
  return res.status(200).json({ lol: "lol" });
});

exports.createTodo = catchAsync(async function (req, res, next) {
  const todo = await Todo.create({
    vehicle: req.body.vehicleId,
    category: req.body.category,
    description: req.body.description,
    completed: req.body.completed,
  });
  return res.status(200).json(todo);
});
