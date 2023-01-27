import React from "react";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Overview.css";
import "../VehicleDetail.css";
import SellVehicleModal from "./modals/SellVehicleModal";
import ReclaimVehicleModal from "./modals/ReclaimVehicleModal";

import {
  getTenure,
  getVehicleAge,
  getDrivenMileage,
  getMileagePerYear,
  getEstimatedUsage,
  getEstimatedMPG,
  getTotalExpenses,
  getCreditedExpenses,
  getGrossProfit,
  getNetProfit,
  getCostPerDay,
} from "../../Functions";

const Overview = function (props) {
  const history = useHistory();

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

  const sellVehicleHandler = function (soldDate, soldFor, mileage) {
    const saleData = {
      vehicleId: props.vehicle._id,
      sold: true,
      soldDate,
      soldFor,
      mileage,
      purchaseDate: props.vehicle.purchaseDate,
    };
    const req = fetch("http://127.0.0.1:4000/garage/sale", {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(saleData),
    })
      .then((res) => res.json())
      .then((data) => {
        history.push("/");
        window.location.reload(false);
        return setShowModal(false);
      })
      .catch((err) => console.log(err));
    // return showModal ? setShowModal(false) : setShowModal(true);
  };

  const reclaimVehicleHandler = function (buyBack, buyBackDate, buyBackPrice, buyBackMileage) {
    let body;
    if (buyBack === false) {
      body = { vehicleId: props.vehicle._id, sold: false, soldDate: null, soldFor: null };
    }
    const req = fetch("http://127.0.0.1:4000/garage/reclaim", {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        history.push("/");
        window.location.reload(false);

        return setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  const showModalHandler = function () {
    setShowModal(true);
  };
  const closeModalHandler = function () {
    setShowModal(false);
  };

  const [expenses, setExpenses] = useState(getTotalExpenses(props.expenses));
  const [creditValue, setCreditValue] = useState(getCreditedExpenses(props.vehicle, props.expenses));
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <Modal show={showModal} onClose={closeModalHandler}>
          {props.vehicle.sold === false && (
            <SellVehicleModal sellVehicle={sellVehicleHandler} heading="Sell Vehicle"></SellVehicleModal>
          )}
          {props.vehicle.sold === true && (
            <ReclaimVehicleModal reclaimVehicle={reclaimVehicleHandler} heading="Reclaim Vehicle"></ReclaimVehicleModal>
          )}
        </Modal>
      )}
      <div className="view-heading">Overview</div>
      <div className="view-flex-horiz overview">
        <div className="detail-info-section">
          <h2 className="detail-section-header">Ownership</h2>

          <div className="info-item">
            <div className="field">Owner</div>
            <div className="value" style={{ textTransform: "capitalize" }}>
              {props.vehicle?.owner ?? "Unknown"}
            </div>
          </div>

          <div className="info-item">
            <div className="field">Purchase Date</div>
            <div className="value">{formatDate(props.vehicle?.purchaseDate) ?? "Unknown"}</div>
          </div>
          <div className="info-item">
            <div className="field">Sold Date</div>
            <div className="value">{formatDate(props.vehicle?.soldDate)}</div>
          </div>
          <div className="info-item">
            <div className="field">Purchase Price</div>
            <div className="value">£{props.vehicle?.boughtFor.toFixed(2)}</div>
          </div>
          <div className="info-item">
            <div className="field">Expenses</div>
            <div className="value">£{expenses.toFixed(2)}</div>
          </div>
          <div className="info-item">
            <div className="field">Total Cost</div>
            <div className="value">£{props.vehicle?.boughtFor + expenses}</div>
          </div>
          <div className="info-item">
            <div className="field">Credited</div>
            <div className="value">£{creditValue}</div>
          </div>
          <div className="info-item">
            <div className="field">Overall Cost</div>
            <div className="value">£{props.vehicle?.boughtFor + expenses - creditValue}</div>
          </div>

          {props.vehicle.sold === true ? (
            <>
              <div className="info-item">
                <div className="field">Sold Price</div>
                <div className="value">£{props.vehicle?.soldFor.toFixed(2)}</div>
              </div>

              <div className="info-item">
                <div className="field">Gross Profit</div>
                <div className="value">£{getGrossProfit(props.vehicle)}</div>
              </div>

              <div className="info-item">
                <div className="field">Net Profit</div>
                <div className="value">£{getNetProfit(props.vehicle, expenses)}</div>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="view-button-flex">
            {!props.vehicle.sold ? (
              <Button value="Sell" back={true} color="green" onClick={showModalHandler}></Button>
            ) : (
              <Button value="Re-claim" onClick={showModalHandler}></Button>
            )}
            <Button value="Update"></Button>
            <Button value="Archive"></Button>
          </div>
        </div>
        <div className="detail-info-section">
          <h2 className="detail-section-header">Vehicle Details</h2>
          <div className="info-item">
            <div className="field">Vehicle Type</div>
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
            <div className="field">Age</div>
            <div className="value">{getVehicleAge(props.vehicle?.year)}</div>
          </div>
          <div className="info-item">
            <div className="field">Engine Capacity</div>
            <div className="value">{props.vehicle?.cc}cc</div>
          </div>
          <div className="info-item">
            <div className="field">Estimated MPG</div>
            <div className="value">{getEstimatedMPG(props.expenses)}</div>
          </div>
        </div>
        <div className="detail-info-section">
          <h2 className="detail-section-header">Usage</h2>
          <div className="info-item">
            <div className="field">Mileage (when bought)</div>
            <div className="value">{`${props.vehicle?.buyMileage} ${props.vehicle.units}`}</div>
          </div>
          <div className="info-item">
            <div className="field">Mileage (current)</div>
            <div className="value">{`${props.vehicle?.currentMileage}  ${props.vehicle.units}`}</div>
          </div>
          <div className="info-item">
            <div className="field">Driven by you</div>
            <div className="value">
              {`
${props.vehicle?.drivenMileage ?? getDrivenMileage(props.vehicle)}
${props.vehicle?.units ?? "mi"}
`}
            </div>
          </div>
          <div className="info-item">
            <div className="field">Tenure</div>
            <div className="value">{getTenure(props.vehicle)} days</div>
          </div>
          <div className="info-item">
            <div className="field">Mileage per year</div>
            <div className="value">{getMileagePerYear(props.vehicle) + " " + props.vehicle?.units}</div>
          </div>
          <div className="info-item">
            <div className="field">Estimated Usage/Week</div>
            <div className="value">{getEstimatedUsage(props.vehicle).toFixed(0) + " " + props.vehicle.units}</div>
          </div>
          <div className="info-item">
            <div className="field">Cost Per Day</div>
            <div className="value">£{getCostPerDay(props.vehicle, props.expenses)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
