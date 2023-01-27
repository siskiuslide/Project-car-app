import React from "react";
import LeaderboardRow from "../LeaderboardRow";

const MostExpensiveExpenses = (props) => {
  return (
    <>
      {props.expenses.slice(0, 7).map((e) => {
        return (
          <LeaderboardRow key={e._id}>
            <p className="capitalize" style={{ width: "50%" }}>
              {e.description}
            </p>
            <p className="capitalize" style={{ width: "50%" }}>
              £{e.value}
            </p>
          </LeaderboardRow>
        );
      })}
    </>
  );
};
export default MostExpensiveExpenses;
