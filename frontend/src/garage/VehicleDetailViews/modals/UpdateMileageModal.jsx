import React, { useState } from "react";
import Button from "../../../Components/Button";
import "../../../Components/Modal.css";

const UpdateMileageModal = (props) => {
  const updateMileage = function () {
    return props.updateMileage(currentMileage);
  };

  const [currentMileage, setCurrentMileage] = useState();

  return (
    <>
      <h2 className="modal-heading">{props.heading}</h2>
      <p className="modal-description">
        Update your mileage to show more accurate calculations on the vehicle detail page
      </p>
      <label style={{ marginInline: "1rem" }} htmlFor="">
        Current Mileage
      </label>
      <input
        style={{ width: "45%" }}
        type="number"
        value={currentMileage}
        onChange={(e) => {
          setCurrentMileage(e.target.value);
        }}
      ></input>
      <div className="buttonarea">
        <Button value="Submit" onClick={updateMileage}></Button>
      </div>
    </>
  );
};

export default UpdateMileageModal;
