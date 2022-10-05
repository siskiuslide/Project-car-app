import React from "react";
import { Link } from "react-router-dom";
import "./VehicleCard.css";

const VehicleCard = (props) => {
  const totalExpenses = props.expenses.reduce((current, next) => {
    return (current += next);
  }, 0);

  return (
    <Link to={`/garage/${props.vehicle._id}`}>
      <div className="VehicleCard">
        <div className="MainInfo">
          <div style={{ marginBlock: 0, height: "10%" }} className="InfoRow">
            <p className="Manufacturer">{props.vehicle.manufacturer}</p>
            <p className="material-icons value" style={{ marginLeft: "auto", paddingRight: "2%" }}>
              sell
            </p>
            <p className="value">£{totalExpenses}</p>
          </div>
          <div className="InfoRow">
            <p className="Model">{props.vehicle.model}</p>
            <p className="variant">{props.vehicle.variant ?? ""}</p>
            <p className="Reg">{props.vehicle.reg.slice(0, 4) + " " + props.vehicle.reg.slice(4)}</p>
          </div>
        </div>
        <div className="InfoPanel">
          <div className="InfoSection">
            <p style={{ margin: 0, textAlign: "center", fontSize: "0.8em" }} className="material-icons">
              {" "}
              calendar_month
            </p>
            <p>{props.vehicle.year}</p>
          </div>
          <p>{props.vehicle.cc} cc</p>
          <p style={{ marginLeft: "auto" }} className="material-icons">
            chevron_right
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;
