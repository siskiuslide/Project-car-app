import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Leaderboard.css";
import "../Dashboard.css";

import { getTenure } from "../../Functions";
import VehicleLeaderboardList from "./vehicle-leaderboards/VehicleLeaderboardList";
import ExpenseLeaderboardList from "./expense-leaderboards/ExpenseLeaderboardList";

const Leaderboard = function (props) {
  const [leaderboardCategory, setLeaderboardCategory] = useState("vehicle");
  // const getTenureList = function () {
  //   const tenureList = [];
  //   props.garage.forEach((v) => {
  //     const tenure = getTenure(v);
  //     const tenureVehicle = {
  //       manufacturer: v.manufacturer,
  //       model: v.model,
  //       reg: v.reg,
  //       id: v._id,
  //       tenure: tenure,
  //     };
  //     return tenureList.push(tenureVehicle);
  //   });

  //   return tenureList;
  // };

  const getAverageMPG = function () {
    return;
  };

  return (
    <>
      <Link className="Leaderboard grid-item">
        <div className="leaderboard-header">
          <p className="GridItemText">Leaderboards</p>
          <label>Select Category</label>
          <select
            onChange={(e) => {
              setLeaderboardCategory(e.target.value);
            }}
          >
            <option value="vehicle">Vehicles</option>
            <option value="expense">Expenses</option>
          </select>
        </div>
        <div className="leaderboard-flex">
          {leaderboardCategory === "vehicle" && (
            <>
              <VehicleLeaderboardList garage={props.garage} expenses={props.expenses}></VehicleLeaderboardList>
            </>
          )}
          {leaderboardCategory === "expense" && (
            <>
              <ExpenseLeaderboardList expenses={props.expenses}></ExpenseLeaderboardList>
            </>
          )}
        </div>
      </Link>
    </>
  );
};

export default Leaderboard;
