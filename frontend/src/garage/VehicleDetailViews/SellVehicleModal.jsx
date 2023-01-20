import React, { useState } from "react";
import "./SellVehicleModal.css";
import "../../Components/Modal.css";

const SellVehicleModal = function () {
  const [soldDate, setSoldDate] = useState();
  const [soldFor, setSoldFor] = useState();
  const [Mileage, setMileage] = useState();
  return (
    <>
      <p className="modal-description">
        Marking your vehicle as sold will not delete the vehicle. The vehicle can be found by searching through your
        garage for sold vehicles.
      </p>
      <form className="sell-vehicle-form form">
        <label className="mandatory">Date of Sale</label>
        <input
          type="date"
          value={soldDate}
          onChange={(e) => {
            setSoldDate(e.target.value);
          }}
        ></input>
        <label className="mandatory">Sale Value</label>
        <input type="number" value={soldFor} onChange={(e) => setSoldFor(e.target.value)}></input>
        <label>Mileage when sold</label>
        <input
          type="number"
          value={setMileage}
          onChange={(e) => {
            setMileage(e.target.value);
          }}
        ></input>
      </form>
    </>
  );
};

export default SellVehicleModal;
