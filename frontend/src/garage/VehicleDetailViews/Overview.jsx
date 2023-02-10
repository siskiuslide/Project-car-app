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
  getCostPerMile,
  getNextServiceDate,
  getNextServiceMileage,
  getEstimatedServiceDate,
  getCostPerMileFuel,
  getAverageTrip,
  dailyMileage,
} from "../../Functions";
import UpdateMileageModal from "./modals/UpdateMileageModal";
import ServiceVehicleModal from "./modals/ServiceVehicleModal";
import ServiceHistoryPlot from "./ServiceHistoryPlot";

const Overview = function (props) {
  const history = useHistory();

  const formatDate = function (timestamp) {
    if (timestamp === null || timestamp === undefined) {
      return null;
    }
    const preformat = new Date(timestamp);
    const date = preformat.getDate();
    const month = preformat.getMonth() + 1;
    const year = preformat.getFullYear();

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
        return setShowModal(false);
      })
      .catch((err) => console.log(err));

    ///credit the purchase expense
    const purchaseExpense = props.expenses.find((e) => {
      const expense = e.vehicleId === props.vehicle._id && e.category === "purchase";
      return expense;
    });
    const creditBody = {
      credited: true,
      creditValue: soldFor,
      creditDate: soldDate,
      creditContext: "sale",
      outstanding: purchaseExpense.value - soldFor,
    };
    const creditExpense = fetch(`http://127.0.0.1:4000/expenses/${purchaseExpense._id}/credit`, {
      method: "put",
      body: JSON.stringify(creditBody),
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        history.push("/");
        return window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  const reclaimVehicleHandler = function (buyBack, buyBackDate, buyBackPrice, buyBackMileage) {
    let body;
    if (buyBack === false) {
      body = { vehicleId: props.vehicle._id, sold: false, soldDate: null, soldFor: null };
    }
    const req = fetch(`http://127.0.0.1:4000/garage/reclaim/${props.vehicle._id}`, {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        history.push("/");
        window.location.reload(false);
        console.log(data);
        return setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  const updateMileageHandler = function (currentMileage) {
    const body = { vehicleId: props.vehicle._id, currentMileage };
    const req = fetch("http://127.0.0.1:4000/garage", {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        setShowModal(false);
        return res.json();
      })
      .then((data) => {
        return setUpdatedMileage(data.data.currentMileage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const serviceVehicleHandler = function (body) {
    //create service record and send to /service/:id
    const service = fetch("http://127.0.0.1:4000/service", {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setServiceHistory(data.data);
        return data;
      });
    //update /vehicle with last service record
    setShowServiceHistoryGraph(true);
    return setShowModal(false);
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
  const [modalView, setModalView] = useState();
  const [updatedMileage, setUpdatedMileage] = useState();
  const [serviceHistory, setServiceHistory] = useState();
  const [showServiceHistoryGraph, setShowServiceHistoryGraph] = useState(true);
  return (
    <>
      {showModal && (
        <Modal show={showModal} onClose={closeModalHandler}>
          {props.vehicle.sold === false && modalView == "sell" && (
            <SellVehicleModal sellVehicle={sellVehicleHandler} heading="Sell Vehicle"></SellVehicleModal>
          )}
          {props.vehicle.sold === true && modalView == "reclaim" && (
            <ReclaimVehicleModal reclaimVehicle={reclaimVehicleHandler} heading="Reclaim Vehicle"></ReclaimVehicleModal>
          )}
          {modalView == "update-mileage" && (
            <UpdateMileageModal heading="Update Mileage" updateMileage={updateMileageHandler}></UpdateMileageModal>
          )}
          {modalView == "service" && (
            <ServiceVehicleModal
              serviceVehicleHandler={serviceVehicleHandler}
              currentMileage={props.vehicle.currentMileage}
              vehicleId={props.vehicle._id}
            />
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
            <div className="value">{formatDate(props.vehicle?.soldDate) ?? ""}</div>
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
                <div className="value">£{getNetProfit(props.vehicle, expenses, props.expenses)}</div>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="view-button-flex">
            {!props.vehicle.sold ? (
              <Button
                value="Sell"
                back={true}
                color="green"
                onClick={() => {
                  setModalView("sell");
                  showModalHandler();
                }}
              ></Button>
            ) : (
              <Button
                value="Re-claim"
                onClick={() => {
                  setModalView("reclaim");
                  showModalHandler();
                }}
              ></Button>
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
          <div className="info-item">
            <div className="field">Average Trip Reading</div>
            <div className="value">{getAverageTrip(props.expenses)}</div>
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
            <div className="value">
              <span
                className="material-icons"
                onClick={() => {
                  setModalView("update-mileage");
                  setShowModal(true);
                }}
              >
                edit
              </span>
              {updatedMileage ?? `${props.vehicle?.currentMileage}  ${props.vehicle.units}`}{" "}
            </div>
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
            <div className="field">Mileage per Day</div>
            <div className="value">{dailyMileage(props.vehicle).toFixed(0) + " " + props.vehicle.units}</div>
          </div>
          <div className="info-item">
            <div className="field">Cost Per Day</div>
            <div className="value">£{getCostPerDay(props.vehicle, props.expenses)}</div>
          </div>
          <div className="info-item">
            <div className="field">Cost Per Mile (total)</div>
            <div className="value">£{getCostPerMile(props.vehicle, props.expenses)}</div>
          </div>
          <div className="info-item">
            <div className="field">Cost Per Mile (fuel)</div>
            <div className="value">£{getCostPerMileFuel(props.vehicle, props.expenses)}</div>
          </div>
        </div>
      </div>
      <div className="view-flex-horiz overview">
        <div className="detail-info-section">
          <h2 className="detail-section-header">Maintenance</h2>
          <p style={{ color: "darkgray", fontSize: "0.75rem", marginTop: "-0.75rem" }}>
            Intervals -{" "}
            <span className="service-interval">
              {props.vehicle?.serviceIntervalMileage}
              {props.vehicle?.units}
            </span>{" "}
            / <span className="service-interval">{props.vehicle?.serviceIntervalTimeMonths}mo</span>
          </p>

          <div className="info-item">
            <div className="field">Last Service Date</div>
            <div className="value">{formatDate(props.vehicle?.lastServiceDate)}</div>
          </div>
          <div className="info-item">
            <div className="field">Last Service Mileage</div>
            <div className="value">{props.vehicle?.lastServiceMileage}</div>
          </div>
          <div className="info-item">
            <div className="field">Last Service Type</div>
            <div className="value capitalize">{props.vehicle?.lastServiceType}</div>
          </div>
          <div className="info-item">
            <div className="field">Last Service Cost</div>
            <div className="value">tbc</div>
          </div>
          <div className="info-item">
            <div className="field">Next Service Due</div>
            <div className="value">{formatDate(getNextServiceDate(props.vehicle))}</div>
          </div>
          <div className="info-item">
            <div className="field">Next Service Mileage</div>
            <div className="value">{getNextServiceMileage(props.vehicle)}</div>
          </div>
          <div className="info-item">
            <div className="field">Estimated Service Date</div>
            <div className="value">{formatDate(getEstimatedServiceDate(props.vehicle))}</div>
          </div>
          <div className="buttonarea">
            <Button value="Edit"></Button>
            <Button
              value="Service"
              onClick={() => {
                setShowServiceHistoryGraph(false);
                setModalView("service");
                showModalHandler();
              }}
            ></Button>
          </div>
        </div>
        <ServiceHistoryPlot
          vehicle={props.vehicle}
          serviceHistory={props.serviceHistory}
          showGraph={showServiceHistoryGraph}
        />
      </div>
    </>
  );
};

export default Overview;
