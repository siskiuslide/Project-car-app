import React from "react";
import "./Garage.css";
import "../App.css";
import { Link } from "react-router-dom";
import VehicleCard from "./VehicleCard";

const Garage = (props) => {
  return (
    <div>
      <div className="GarageGrid">
        {props.garage.map((i) => {
          return (
            <Link to={`/garage/${i.id}`} key={i.id}>
              <VehicleCard vehicle={i}></VehicleCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Garage;
