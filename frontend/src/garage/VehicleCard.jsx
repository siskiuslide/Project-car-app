import React from "react";
import "./VehicleCard.css";

const VehicleCard = (props) => {
  return (
    <div className="VehicleCard">
      <div className="MainInfo">
        <p className="Manufacturer">{props.vehicle.manufacturer}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
  );
};

export default VehicleCard;
