import React from "react";
import "./Overview.css";

const Overview = function (props) {
  console.log(props.vehicle);
  return (
    <>
      <div className="view-heading">Overview</div>
      <div className="overview">
        <div className="info-item">
          <div className="field">Type</div>
          <div className="value">{props.vehicle?.type ?? "Unknown"}</div>
        </div>
        <div className="info-item">
          <div className="field">Owner</div>
          <div className="value">{props.vehicle?.owner ?? "Unknown"}</div>
        </div>
        <div className="info-item">
          <div className="field">Purchase Date</div>
          <div className="value">{props.vehicle?.purchaseDate ?? "Unknown"}</div>
        </div>
        <div className="info-item">
          <div className="field">Purchase Price</div>
          <div className="value">£{props.vehicle?.boughtFor}</div>
        </div>

        {props.vehicle.sold === true ? (
          <>
            <div className="info-item">
              <div className="field">Sold Date</div>
              <div className="value">£{props.vehicle?.soldDate}</div>
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
    </>
  );
};

export default Overview;
