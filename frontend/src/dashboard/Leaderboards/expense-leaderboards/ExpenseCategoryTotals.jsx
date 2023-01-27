import React from "react";
import LeaderboardRow from "../LeaderboardRow";

const ExpenseCategoryTotals = (props) => {
  return (
    <>
      {props.totals
        .sort((a, b) => {
          return b.total - a.total;
        })
        .slice(0, 7)
        .map((t) => {
          return (
            <LeaderboardRow key={t._id}>
              <p className="capitalize" style={{ width: "50%" }}>
                {t.category}
              </p>
              <p className="capitalize" style={{ width: "50%" }}>
                £{t.total.toFixed(2)}
              </p>
            </LeaderboardRow>
          );
        })}
    </>
  );
};

export default ExpenseCategoryTotals;
