import React from "react";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Overview.css";
import "../VehicleDetail.css";
import SellVehicleModal from "./modals/SellVehicleModal";
import ReclaimVehicleModal from "./modals/ReclaimVehicleModal";

const Overview = function (props) {
  const [age, setAge] = useState();
  const [tenure, setTenure] = useState();
  const [drivenMileage, setDrivenMileage] = useState();
  const [showModal, setShowModal] = useState(false);

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

  const getVehicleAge = function (year) {
    const current = new Date().getFullYear();
    const age = parseInt(current - year);
    return age;
  };

  const getDrivenMileage = function (buyMileage, currentMileage) {
    if (!currentMileage) {
      return "unknown";
    }
    const drivenMileage = currentMileage - buyMileage;
    return drivenMileage;
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
    const difference = parseInt(date1 - date2);
    const days = difference / (1000 * 60 * 60 * 24);

    return days;
  };

  const getMileagePerYear = function (currentMileage, buyMileage, year) {
    if (!currentMileage || !buyMileage) {
      return "N/A";
    }

    const age = getVehicleAge(year);
    if (!currentMileage) {
      return buyMileage / age;
    }
    if (!buyMileage) {
      return "Unknown";
    } else return (currentMileage / age).toFixed(0);
  };

  const getEstimatedUsage = function (buyMileage, currentMileage, sellDate, buyDate) {
    const drivenMileage = getDrivenMileage(buyMileage, currentMileage);
    const days = getTenure(sellDate, buyDate);
    const weeks = days / 7;
    const perWeek = drivenMileage / weeks;
    return perWeek;
  };

  const sellVehicleHandler = function (soldDate, soldFor, mileage) {
    const saleData = { vehicleId: props.vehicle._id, sold: true, soldDate, soldFor, mileage };
    console.log(saleData);
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
            <div className="field">Purchase Price</div>
            <div className="value">£{props.vehicle?.boughtFor}</div>
          </div>
          <div className="info-item">
            <div className="field">Purchase Date</div>
            <div className="value">{formatDate(props.vehicle?.purchaseDate) ?? "Unknown"}</div>
          </div>

          {props.vehicle.sold === true ? (
            <>
              <div className="info-item">
                <div className="field">Sold Date</div>
                <div className="value">{formatDate(props.vehicle?.soldDate)}</div>
              </div>
              <div className="info-item">
                <div className="field">Sold Price</div>
                <div className="value">£{props.vehicle?.soldFor}</div>
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
        </div>
        <div className="detail-info-section">
          <h2 className="detail-section-header">Usage</h2>
          <div className="info-item">
            <div className="field">Mileage (when bought)</div>
            <div className="value">{props.vehicle?.buyMileage + props.vehicle.units}</div>
          </div>
          <div className="info-item">
            <div className="field">Mileage (current)</div>
            <div className="value">{props.vehicle?.currentMileage + props.vehicle.units}</div>
          </div>
          <div className="info-item">
            <div className="field">Driven by you</div>
            <div className="value">
              {getDrivenMileage(props.vehicle?.buyMileage, props.vehicle?.currentMileage) + props.vehicle.units}
            </div>
          </div>
          <div className="info-item">
            <div className="field">Tenure</div>
            <div className="value">
              {getTenure(props.vehicle?.soldDate, props.vehicle?.purchaseDate).toFixed(0)} days
            </div>
          </div>
          <div className="info-item">
            <div className="field">Mileage per year</div>
            <div className="value">
              {getMileagePerYear(props.vehicle.currentMileage, props.vehicle.buyMileage, props.vehicle.year) +
                props.vehicle?.units}
            </div>
          </div>
          <div className="info-item">
            <div className="field">Estimated Usage/Week</div>
            <div className="value">
              {getEstimatedUsage(
                props.vehicle.buyMileage,
                props.vehicle.currentMileage,
                props.vehicle?.sellDate,
                props.vehicle?.purchaseDate
              ).toFixed(0) + props.vehicle.units}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
