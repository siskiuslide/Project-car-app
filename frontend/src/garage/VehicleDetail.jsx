import React from "react";
import "./VehicleDetail.css";
import "./VehicleCard.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VehicleDetailOverview from "./VehicleDetailViews/VehicleDetailOverview";
import VehicleViewContainer from "./VehicleDetailViews/VehicleViewContainer";
import Button from "../Components/Button";

const CarDetail = (props) => {
  const [garage, setGarage] = useState(props?.garage);
  const [vehicle, setVehicle] = useState();
  const [neighbouringVehicles, setNeighbouringVehicles] = useState();
  const [view, setView] = useState("overview");
  const params = useParams();

  const findTargetVehicle = function (vehicleId) {
    const target = garage.find((el) => el._id == vehicleId);
    return setVehicle(target);
  };

  const findVehicleExpenses = function (vehicleId) {
    const expenses = props.expenses.filter((e) => e.vehicleId === vehicleId);
    return expenses;
  };
  // const findNeighbouringVehicles = function (vehicleId) {
  //   const index = garage.findIndex((v) => v._id === vehicleId);
  //   const garageArrSize = garage.length - 1;
  //   let nextSearchIndex;
  //   let prevSearchIndex;
  //   if (index == garageArrSize) {
  //     nextSearchIndex = 0;
  //     prevSearchIndex = index - 1;
  //   } else if (index === 0) {
  //     nextSearchIndex = index + 1;
  //     prevSearchIndex = garageArrSize;
  //   } else {
  //     nextSearchIndex = index + 1;
  //     prevSearchIndex = index - 1;
  //   }
  //   const nextVehicle = garage[nextSearchIndex];
  //   const prevVehicle = garage[prevSearchIndex];
  //   // const stateUpdate = { prev: prevVehicle._id, next: nextVehicle._id };
  //   return setNeighbouringVehicles(stateUpdate);
  // };

  useEffect(() => {
    const getGarage = async () => {
      const garagereq = await fetch(`http://localhost:4000/garage`);
      const json = await garagereq.json();
      const data = json.data;
      setGarage(data);
      return data;
    };
    getGarage().then(findTargetVehicle(params.vehicleId));
    // .then(findNeighbouringVehicles(params.vehicleId));
  }, []);

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
        <div className="header-buttons">
          {/* <Link to={`/garage/${neighbouringVehicles.prev._id}`}> */}
          <Link to="/garage">
            <Button className="button-to-vehicle" value="Previous Vehicle"></Button>
          </Link>
          <Link to={`/garage/${neighbouringVehicles?.next}`}>
            <Button className="button-to-vehicle" value="Next Vehicle"></Button>
          </Link>
        </div>
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
          <VehicleViewContainer
            view={view}
            vehicle={vehicle}
            expenses={findVehicleExpenses(params.vehicleId)}
          ></VehicleViewContainer>
        </div>
      </div>
    </>
  );
};

export default CarDetail;
