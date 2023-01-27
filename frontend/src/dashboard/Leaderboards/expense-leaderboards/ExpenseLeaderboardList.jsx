import React from "react";
import { getExpenseCategoryTotals } from "../LeaderboardFunctions";
import LeaderboardItem from "../LeaderboardItem";
import ExpenseCategoryTotals from "./ExpenseCategoryTotals";

const ExpenseLeaderboardList = (props) => {
  return (
    <>
      <LeaderboardItem heading="Expense Category Totals">
        <ExpenseCategoryTotals totals={getExpenseCategoryTotals(props.expenses)} />
      </LeaderboardItem>
      <LeaderboardItem heading=""></LeaderboardItem>
      <LeaderboardItem heading=""></LeaderboardItem>
    </>
  );
};

export default ExpenseLeaderboardList;
