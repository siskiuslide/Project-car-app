import React from "react";
import Overview from "./Overview";

const VehicleViewContainer = function (props) {
  switch (props.view) {
    case "overview":
      return <Overview vehicle={props.vehicle} />;

    case "manage":
      return <>manage</>;

    case "expenses":
      return <>expenses</>;

    case "todo":
      return <>todo</>;

    default:
      return <>overview</>;
  }
};

export default VehicleViewContainer;
