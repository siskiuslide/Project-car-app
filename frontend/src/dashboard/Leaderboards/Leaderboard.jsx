import React from "react";
import { Link } from "react-router-dom";
import "./Leaderboard.css";
import "../Dashboard.css";
import LeaderboardItem from "./LeaderboardItem";

const Leaderboard = function (props) {
  return (
    <>
      <Link className="Leaderboard grid-item">
        <p className="GridItemText">Leaderboards</p>
        <div className="leaderboard-flex">
          <LeaderboardItem heading="Tenure"></LeaderboardItem>
          <LeaderboardItem heading="Overall Cost"></LeaderboardItem>
          <LeaderboardItem heading="Mileage Driven"></LeaderboardItem>
          <LeaderboardItem heading="Average MPG"></LeaderboardItem>
          <LeaderboardItem heading="Cost Per Mile"></LeaderboardItem>
        </div>
      </Link>
    </>
  );
};

export default Leaderboard;
