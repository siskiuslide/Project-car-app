import React from "react";
import "./Leaderboard.css";

const LeaderboardItem = (props) => {
  return (
    <div className="leaderboard-section">
      <h2 className="leaderboard-heading">{props.heading}</h2>
    </div>
  );
};

export default LeaderboardItem;
