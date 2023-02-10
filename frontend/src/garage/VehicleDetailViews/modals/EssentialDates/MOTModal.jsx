import React, { useState } from "react";
import Button from "../../../../Components/Button";

const MOTModal = (props) => {
  const [motDueDate, setMotDueDate] = useState();

  return (
    <>
      <h2 className="modal-heading">MOT Update</h2>
      <p className="modal-description">Update the MOT date of the vehicle</p>
      <p className="modal-description">
        Link to{" "}
        <a style={{ color: "var(--blue)" }} href="https://www.gov.uk/check-mot-history">
          GOV website
        </a>{" "}
        for MOT history checking
      </p>
      <form>
        <label>MOT Due</label>
        <input type="date" onChange={(e) => setMotDueDate(e.target.value)} value={motDueDate}></input>
      </form>
      <div className="buttonarea">
        <Button
          value="Submit"
          onClick={() => {
            props.setMotDate(motDueDate);
          }}
        ></Button>
      </div>
    </>
  );
};

export default MOTModal;
