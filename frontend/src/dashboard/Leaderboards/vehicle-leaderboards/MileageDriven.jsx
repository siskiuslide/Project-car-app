import React from "react";
import LeaderboardRow from "../LeaderboardRow";

const MileageDriven = (props) => {
  return (
    <>
      {props.mileageList
        .sort((a, b) => {
          return b.mileageDriven - a.mileageDriven;
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
              <p style={{ width: "20%" }}>{v.mileageDriven} mi</p>
            </LeaderboardRow>
          );
        })}
    </>
  );
};

export default MileageDriven;
