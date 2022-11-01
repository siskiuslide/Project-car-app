import React, { useEffect, useState } from "react";
import "./VehicleCount.css";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const Count = (props) => {
  return (
    <Link className="Count GridItem " to={props.link}>
      <p className="GridItemText hovereffect">Vehicles in your garage:</p>
      <p
        className="EnlargedFigure"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          border: "1px solid red",
          width: "2em",
          height: "2em",
          marginInline: "auto",
        }}
      >
        {props.isLoading ? "..." : props.garage.length}
      </p>
      <div className="moreInfoList">
        <div className="moreInfoFlex">
          <p>Cars:</p>
          <p>{props.isLoading ? "..." : props.garage.length}</p>
        </div>
        <div className="moreInfoFlex">
          <p>Bikes:</p>
          <p>0</p>
        </div>
      </div>
    </Link>
  );
};

export default Count;
