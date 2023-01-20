import React from "react";
import Button from "../../Components/Button";
import "../VehicleDetail.css";

const Manage = function () {
  return (
    <>
      <div className="view-heading">Manage</div>
      <div className="view-flex-horiz manage">
        <div className="detail-info-section">
          <h2 className="detail-section-header">Ownership</h2>
        </div>

        <div className="detail-info-section">
          <h2 className="detail-section-header">Details</h2>
        </div>

        <div className="detail-info-section">
          <h2 className="detail-section-header">Usage</h2>
        </div>
      </div>
    </>
  );
};

export default Manage;
