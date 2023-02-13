import React, { useState } from "react";
import Button from "../../../../Components/Button";

const InsuranceModal = (props) => {
  const [insuranceDue, setInsuranceDue] = useState();
  return (
    <>
      <h2 className="modal-heading">Insurance Update</h2>
      <p className="modal-description">Update the Insurance due date of the vehicle</p>

      <form>
        <label>Insurance Due</label>
        <input type="date" onChange={(e) => setInsuranceDue(e.target.value)} value={insuranceDue}></input>
      </form>
      <div className="buttonarea">
        <Button
          value="Submit"
          onClick={() => {
            props.setDueDate(insuranceDue, "Insurance");
          }}
        ></Button>
      </div>
    </>
  );
};

export default InsuranceModal;
