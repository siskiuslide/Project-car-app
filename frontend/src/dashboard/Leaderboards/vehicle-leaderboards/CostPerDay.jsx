import React from "react";
import LeaderboardRow from "../LeaderboardRow";

const CostPerMile = (props) => {
  return (
    <div>
      {props.costList
        .sort((a, b) => {
          return b.costPerDay - a.costPerDay;
        })
        .map((v) => {
          return (
            <LeaderboardRow key={v._id}>
              <p className="capitalize" style={{ width: "15%" }}>
                {v.manufacturer}
              </p>
              <p className="capitalize" style={{ width: "20%" }}>
                {v.model}
              </p>
              <p className="uppercase" style={{ width: "20%" }}>
                {v.reg}
              </p>
              <p style={{ width: "20%" }}>{v.tenure} days</p>
              <p style={{ width: "20%" }}>£{v.costPerDay} / day</p>
            </LeaderboardRow>
          );
        })}
    </div>
  );
};

export default CostPerMile;
