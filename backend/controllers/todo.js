const catchAsync = require("../helpers/catchAsync");
const Todo = require("../models/todoModel");

exports.getAllTodos = catchAsync(async function (req, res, next) {
  const todos = await Todo.find();
  return res.status(200).json({ todos: todos });
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

exports.deleteTodo = catchAsync(async function (req, res, next) {
  const deleted = await Todo.deleteOne({ id: req.body.id });
  return res.status(200).json(deleted);
});

exports.updateTodo = catchAsync(async function (req, res, next) {
  console.log(req.body);
  const updated = await Todo.findOneAndUpdate({ _id: req.body.id }, { completed: req.body.completed });
  const todos = await Todo.find();
  return res.status(200).json(todos);
});
