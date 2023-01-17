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
          <div className="overview-info-section"></div>
        </div>
      </div>
    </>
  );
};

export default Overview;
