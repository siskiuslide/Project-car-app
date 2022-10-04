const catchAsync = require("../helpers/catchAsync");
const expenseModel = require("../models/expenseModel");

exports.addExpense = catchAsync(async function (req, res, next) {
  return res.status(200).json({ status: "success", data: "test" });
});
