import React from "react";
import "./Garage.css";
import "../App.css";
import { Link } from "react-router-dom";
import VehicleCard from "./VehicleCard";
import AddVehicleCard from "./AddVehicleCard";

const Garage = (props) => {
  const findExpensesFromList = (id) => {
    return props.expenses
      .filter((e) => e.vehicleId == id)
      .map((e) => {
        return e.value;
      });
    // .reduce((current, next) => {
    //   return (current += next);
    // }, 0);
  };
  return (
    <div>
      <div className="GarageGrid">
        <Link to="/garage/add-vehicle" className="link">
          <AddVehicleCard></AddVehicleCard>
        </Link>
        {props.garage.map((i) => {
          return <VehicleCard key={i._id} vehicle={i} expenses={findExpensesFromList(i._id)}></VehicleCard>;
        })}
      </div>
    </div>
  );
};

export default Garage;
