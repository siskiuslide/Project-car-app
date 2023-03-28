import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { convertKMtoMi } from "../Functions";

const TotalMileage = (props) => {
  const getMileagesList = function () {
    const mileagesList = [];
    props.garage.forEach((i) => {
      let mileageDriven = i.currentMileage - i.buyMileage;
      if (i.units === "km") {
        const calculation = i.currentMileage - i.buyMileage;
        mileageDriven = convertKMtoMi(calculation);
      }
      const vehicle = { vehicleId: i._id, manufacturer: i.manufacturer, reg: i.reg, mileageDriven };
      return mileagesList.push(vehicle);
    });
    return mileagesList;
  };

  const getTotalMileage = function () {
    const mileagesList = getMileagesList();
    const total = mileagesList.reduce((current, next) => {
      return (current += next.mileageDriven);
    }, 0);
    return total;
  };

  const getTotalFuelCost = function () {
    const filtered = props.expenses.filter((i) => i.category === "fuel");
    const total = filtered.reduce((current, next) => {
      return (current += next.value);
    }, 0);
    return total?.toFixed();
  };

  return (
    <div className="TotalCosts GridItem ">
      <p className="GridItemText ">Total Mileage:</p>
      <p
        className="EnlargedFigure"
        style={{
          textDecoration: "underline",
          textDecorationColor: "red",
          textDecorationThickness: "1px",
          textUnderlinePosition: "under",
        }}
      >
        {getTotalMileage().toFixed()} mi
      </p>
      <div className="moreInfoList">
        <div className="moreInfoFlex">
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default TotalMileage;
