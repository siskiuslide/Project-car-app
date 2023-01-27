import React from "react";
import { getExpenseCategoryTotals, getMostExpensive } from "../LeaderboardFunctions";
import LeaderboardItem from "../LeaderboardItem";
import ExpenseCategoryTotals from "./ExpenseCategoryTotals";
import MostExpensiveExpenses from "./MostExpensiveExpenses";

const ExpenseLeaderboardList = (props) => {
  return (
    <>
      <LeaderboardItem heading="Expense Category Totals">
        <ExpenseCategoryTotals totals={getExpenseCategoryTotals(props.expenses)} />
      </LeaderboardItem>
      <LeaderboardItem heading="Most Expensive Expenses">
        <MostExpensiveExpenses expenses={getMostExpensive(props.expenses)}></MostExpensiveExpenses>
      </LeaderboardItem>
      <LeaderboardItem heading=""></LeaderboardItem>
    </>
  );
};

export default ExpenseLeaderboardList;
