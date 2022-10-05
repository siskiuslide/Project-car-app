const express = require("express");
const expenseController = require("../controllers/expenses");

const router = express.Router();

router.route("/").get(expenseController.getAllExpenses).post(expenseController.addExpense);

module.exports = router;
