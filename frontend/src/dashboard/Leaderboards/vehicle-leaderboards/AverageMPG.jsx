import React from "react";
import LeaderboardRow from "../LeaderboardRow";

const AverageMPG = (props) => {
  return (
    <>
      {props.mpgList.map((v) => {
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
            <p style={{ width: "20%" }}>
              {v.mpg} {v.units}pg
            </p>
          </LeaderboardRow>
        );
      })}
    </>
  );
};

export default AverageMPG;
