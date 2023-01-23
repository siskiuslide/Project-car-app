const express = require("express");
const expenseController = require("../controllers/expenses");

const router = express.Router();

router
  .route("/")
  .get(expenseController.getAllExpenses)
  .post(expenseController.addExpense)
  .delete(expenseController.deleteExpense);

router.route("/:id/credit").put(expenseController.creditExpense);

module.exports = router;
