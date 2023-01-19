import React from "react";
import { useEffect } from "react";
import "./Overview.css";

const Overview = function (props) {
  const formatDate = function (timestamp) {
    const preformat = new Date(timestamp);
    const date = preformat.getDate();
    const month = preformat.getMonth() + 1;
    const year = preformat.getFullYear();

    // if (date.toString().length() < 2) {
    //   date.toString().concat("0");
    // }

    return `${date}/${month}/${year}`;
  };

  const getDrivenMileage = function (buyMileage, currentMileage) {
    return currentMileage - buyMileage;
  };

  const getTenure = function (sellDate, buyDate) {
    if (!buyDate) {
      return "N/A";
    }
    let date1 = new Date(sellDate);
    let date2 = new Date(buyDate);
    if (!sellDate) {
      date1 = Date.now();
    }
    console.log(date1, date2);
    const difference = parseInt(date1 - date2);
    console.log(difference);
    const days = difference / (1000 * 60 * 60 * 24);

    return days.toFixed(0) + " days";
  };

  return (
    <>
      <div className="view-heading">Overview</div>
      <div className="overview">
        <div className="overview-info-section">
          <h2 className="overview-section-header">Ownership</h2>

          <div className="info-item">
            <div className="field">Owner</div>
            <div className="value">{props.vehicle?.owner ?? "Unknown"}</div>
          </div>
          <div className="info-item">
            <div className="field">Purchase Date</div>
            <div className="value">{formatDate(props.vehicle?.purchaseDate) ?? "Unknown"}</div>
          </div>
          <div className="info-item">
            <div className="field">Purchase Price</div>
            <div className="value">£{props.vehicle?.boughtFor}</div>
          </div>

          {props.vehicle.sold === true ? (
            <>
              <div className="info-item">
                <div className="field">Sold Date</div>
                <div className="value">£{formatDate(props.vehicle?.soldDate)}</div>
              </div>
              <div className="info-item">
                <div className="field">Sold Price</div>
                <div className="value">£{props.vehicle?.soldPrice}</div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="overview-info-section">
          <h2 className="overview-section-header">Vehicle Details</h2>
          <div className="info-item">
            <div className="field">Type</div>
            <div className="value" style={{ textTransform: "capitalize" }}>
              {props.vehicle?.type ?? "Unknown"}
            </div>
          </div>
          <div className="info-item">
            <div className="field">Model Variant</div>
            <div className="value">{props.vehicle?.variant}</div>
          </div>
          <div className="info-item">
            <div className="field">Model Year</div>
            <div className="value">{props.vehicle?.year}</div>
          </div>
          <div className="info-item">
            <div className="field">Engine Capacity</div>
            <div className="value">{props.vehicle?.cc}cc</div>
          </div>
        </div>
        <div className="overview-info-section">
          <h2 className="overview-section-header">Usage</h2>
          <div className="info-item">
            <div className="field">Mileage (when bought)</div>
            <div className="value">{props.vehicle?.buyMileage}</div>
          </div>
          <div className="info-item">
            <div className="field">Mileage (current)</div>
            <div className="value">{props.vehicle?.mileage}</div>
          </div>
          <div className="info-item">
            <div className="field">Driven</div>
            <div className="value">
              {props.vehicle.mileage ? getDrivenMileage(props.vehicle?.buyMileage, props.vehicle?.mileage) : "Unknown"}
            </div>
          </div>
          <div className="info-item">
            <div className="field">Tenure</div>
            <div className="value">{getTenure(props.vehicle?.sellDate, props.vehicle?.purchaseDate)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
