const catchAsync = require("../helpers/catchAsync");
const Expense = require("../models/expenseModel");

exports.getAllExpenses = catchAsync(async function (req, res, next) {
  const expenses = await Expense.find();
  return res.status(200).json({ status: "success", data: expenses });
});

exports.addExpense = catchAsync(async function (req, res, next) {
  const expense = {
    ...req.body,
  };
  await Expense.create(expense);
  return res.status(200).json({ status: "success", data: expense });
});

exports.deleteExpense = catchAsync(async function (req, res, next) {
  const deleted = await Expense.deleteOne({ _id: req.body.id });
  const expenses = await Expense.find();
  return res.status(200).json({ status: "success", data: expenses });
});

exports.creditExpense = catchAsync(async function (req, res, next) {
  const credit = await Expense.findOneAndUpdate({ _id: req.params.id }, { ...req.body });
  return res.status(200).json({ status: "success", data: credit });
});
