const express = require("express");
const expenseController = require("../controllers/expenses");

const router = express.Router();

router
  .route("/")
  .get(expenseController.getAllExpenses)
  .post(expenseController.addExpense)
  .delete(expenseController.deleteExpense);

module.exports = router;
