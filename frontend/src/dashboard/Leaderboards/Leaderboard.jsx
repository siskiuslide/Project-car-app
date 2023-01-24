import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Leaderboard.css";
import "../Dashboard.css";
import LeaderboardItem from "./LeaderboardItem";
import Tenure from "./Tenure";
import OverallCost from "./OverallCost";
import { getTenure } from "../../Functions";

const Leaderboard = function (props) {
  const getTenureList = function () {
    const tenureList = [];
    props.garage.forEach((v) => {
      const tenure = getTenure(v);
      const tenureVehicle = {
        manufacturer: v.manufacturer,
        model: v.model,
        reg: v.reg,
        id: v._id,
        tenure: tenure,
      };
      console.log(tenureVehicle);
      return tenureList.push(tenureVehicle);
    });

    return tenureList;
  };

  return (
    <>
      <Link className="Leaderboard grid-item">
        <p className="GridItemText">Leaderboards</p>
        <div className="leaderboard-flex">
          <LeaderboardItem heading="Tenure">
            <Tenure garage={props.garage} tenureList={getTenureList()}></Tenure>
          </LeaderboardItem>
          <LeaderboardItem heading="Overall Cost">
            <OverallCost></OverallCost>
          </LeaderboardItem>
          <LeaderboardItem heading="Mileage Driven"></LeaderboardItem>
          <LeaderboardItem heading="Average MPG"></LeaderboardItem>
          <LeaderboardItem heading="Cost Per Mile"></LeaderboardItem>
        </div>
      </Link>
    </>
  );
};

export default Leaderboard;
