const catchAsync = require("../helpers/catchAsync");
const todo = require("../models/todoModel");

exports.getAllTodos = catchAsync(async function (req, res, next) {
  return res.status(200).json({ lol: "lol" });
});
