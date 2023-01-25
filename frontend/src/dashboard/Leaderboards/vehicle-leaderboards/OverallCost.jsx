import React from "react";
import LeaderboardRow from "../LeaderboardRow";

const OverallCost = (props) => {
  return (
    <>
      {props.costs
        .sort((a, b) => {
          return b.totalCost - a.totalCost;
        })
        .map((v) => {
          return (
            <LeaderboardRow>
              <p className="capitalize" style={{ width: "20%" }}>
                {v.manufacturer}
              </p>
              <p className="capitalize" style={{ width: "25%" }}>
                {v.model}
              </p>
              <p className="uppercase" style={{ width: "25%" }}>
                {v.reg}
              </p>
              <p style={{ width: "20%" }}>£{v.totalCost.toFixed(2)}</p>
            </LeaderboardRow>
          );
        })}
    </>
  );
};

export default OverallCost;
