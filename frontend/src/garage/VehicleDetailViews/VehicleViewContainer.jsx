import React from "react";
import Overview from "./Overview";
import Manage from "./Manage";

const VehicleViewContainer = function (props) {
  switch (props.view) {
    case "overview":
      return <Overview vehicle={props.vehicle} expenses={props.expenses} />;

    case "manage":
      return <Manage vehicle={props.vehicle} />;

    case "expenses":
      return <>expenses</>;

    case "todo":
      return <>todo</>;

    default:
      return <>overview</>;
  }
};

export default VehicleViewContainer;
