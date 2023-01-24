import React, { useState } from "react";
import { useEffect } from "react";
import { getTenure } from "../../Functions";
import LeaderboardRow from "./LeaderboardRow";

const Tenure = (props) => {
  return (
    <div>
      {props.tenureList
        .sort((a, b) => {
          return b.tenure - a.tenure;
        })
        .map((v) => {
          return (
            <LeaderboardRow key={v._id}>
              <p className="capitalize" style={{ width: "20%" }}>
                {v.manufacturer}
              </p>
              <p className="capitalize" style={{ width: "25%" }}>
                {v.model}
              </p>
              <p className="uppercase" style={{ width: "25%" }}>
                {v.reg}
              </p>
              <p>{v.tenure} days</p>
            </LeaderboardRow>
          );
        })}
    </div>
  );
};

export default Tenure;
