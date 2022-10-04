const catchAsync = require("../helpers/catchAsync");
const Expense = require("../models/expenseModel");

exports.addExpense = catchAsync(async function (req, res, next) {
  const expense = {
    vehicleId: req.body.vehicleId,
    date: req.body.date,
    category: req.body.category,
    value: req.body.value,
  };
  await Expense.create(expense);
  return res.status(200).json({ status: "success", data: expense });
});
