import React from "react";
import "./Garage.css";
import "../App.css";
import { Link } from "react-router-dom";
import VehicleCard from "./VehicleCard";
import AddVehicleCard from "./AddVehicleCard";

const Garage = (props) => {
  return (
    <div>
      <div className="GarageGrid">
        <Link to="/garage/add-vehicle" className="link">
          <AddVehicleCard></AddVehicleCard>
        </Link>
        {props.garage.map((i) => {
          return (
            <>
              <Link to={`/garage/${i.id}`} key={i.id}>
                <VehicleCard vehicle={i}></VehicleCard>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Garage;
