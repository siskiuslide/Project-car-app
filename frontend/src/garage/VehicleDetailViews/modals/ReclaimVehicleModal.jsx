import React, { useState } from "react";
import Button from "../../../Components/Button";
import "./ReclaimVehicleModal.css";

const ReclaimVehicleModal = function (props) {
  const [buyBack, setBuyBack] = useState(false);

  const reclaimHandler = function () {
    if (buyBack === false) {
      return props.reclaimVehicle(false);
    } else {
    }
  };
  return (
    <>
      <h2 className="modal-heading">{props.heading}</h2>
      <p className="modal-description">Reclaim the vehicle to return it into your garage.</p>
      <p className="modal-description">
        Are you buying the vehicle back?
        <span>
          <input
            type="checkbox"
            className="buyback-checkbox"
            value="true"
            onChange={(e) => setBuyBack(e.target.checked)}
          ></input>
        </span>
      </p>
      <div className="buttonarea">
        <Button value={buyBack ? "Reclaim Vehicle" : "Undo Sale"} onClick={reclaimHandler}></Button>
      </div>
    </>
  );
};

export default ReclaimVehicleModal;
