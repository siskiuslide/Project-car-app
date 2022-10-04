const express = require("express");
const expenseController = require("../controllers/expenses");

const router = express.Router();

router.route("/").get().post(expenseController.addExpense);

module.exports = router;
