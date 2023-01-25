import React from "react";
import LeaderboardItem from "../LeaderboardItem";
import MileageDriven from "./MileageDriven";
import Tenure from "./Tenure";
import OverallCost from "./OverallCost";
import AverageMPG from "./AverageMPG";

import { getOverallCost, getTenureList, getMileageDriven } from "../LeaderboardFunctions";

const VehicleLeaderboardList = (props) => {
  return (
    <>
      <LeaderboardItem heading="Tenure">
        <Tenure tenureList={getTenureList(props.garage)}></Tenure>
      </LeaderboardItem>
      <LeaderboardItem heading="Overall Cost">
        <OverallCost costs={getOverallCost(props.garage, props.expenses)}></OverallCost>
      </LeaderboardItem>
      <LeaderboardItem heading="Mileage Driven (by you)">
        <MileageDriven mileageList={getMileageDriven(props.garage)}></MileageDriven>
      </LeaderboardItem>
      <LeaderboardItem heading="Average MPG">
        <AverageMPG></AverageMPG>
      </LeaderboardItem>
      <LeaderboardItem heading="Cost Per Mile"></LeaderboardItem>
    </>
  );
};

export default VehicleLeaderboardList;
