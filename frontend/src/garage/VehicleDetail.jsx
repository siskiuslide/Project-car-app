import React from "react";
import "./VehicleDetail.css";
import "./VehicleCard.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VehicleDetailOverview from "./VehicleDetailViews/VehicleDetailOverview";
import VehicleViewContainer from "./VehicleDetailViews/VehicleViewContainer";

const CarDetail = (props) => {
  const [vehicle, setVehicle] = useState();
  const [view, setView] = useState("overview");
  const params = useParams();

  const findTargetVehicle = function (vehicleId) {
    const target = props.garage.find((el) => el._id === vehicleId);
    return setVehicle(target);
  };
  useEffect(() => {
    findTargetVehicle(params.vehicleId);
  });

  if (!vehicle) {
    return (
      <>
        <h1 className="car-detail-heading">Vehicle Not Found!</h1>
      </>
    );
  }
  return (
    <>
      <div className="header-flex">
        <h1 className="vehicle-detail-heading">{vehicle?.manufacturer + " " + vehicle?.model}</h1>
        <p className="Reg" style={{ width: "auto", fontSize: "1.5rem" }}>
          {vehicle?.reg.toUpperCase()}
        </p>
      </div>
      <div className="vehicle-detail-main">
        <div className="vehicle-view-list">
          <div
            className="vehicle-view-option"
            onClick={() => {
              setView("overview");
            }}
          >
            Overview
          </div>
          <div
            className="vehicle-view-option"
            onClick={() => {
              setView("manage");
            }}
          >
            Manage
          </div>
          <div
            className="vehicle-view-option"
            onClick={() => {
              setView("expenses");
            }}
          >
            Expenses
          </div>
          <div
            className="vehicle-view-option"
            onClick={() => {
              setView("todo");
            }}
          >
            To-Do
          </div>
        </div>
        <div className="vehicle-view-detail">
          <VehicleViewContainer view={view} vehicle={vehicle}></VehicleViewContainer>
        </div>
      </div>
    </>
  );
};

export default CarDetail;
