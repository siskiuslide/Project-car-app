import React, { useState } from "react";
import Button from "../../../../Components/Button";

const TaxModal = (props) => {
  const [TaxDue, setTaxDue] = useState();
  return (
    <>
      <h2 className="modal-heading">Tax Update</h2>
      <p className="modal-description">Update the Tax date of the vehicle</p>
      <p className="modal-description">
        Link to{" "}
        <a style={{ color: "var(--blue)" }} href="https://www.gov.uk/check-mot-history">
          GOV website
        </a>{" "}
        for Tax status checking
      </p>
      <form>
        <label>Tax Due</label>
        <input type="date" onChange={(e) => setTaxDue(e.target.value)} value={TaxDue}></input>
      </form>
      <div className="buttonarea">
        <Button
          value="Submit"
          onClick={() => {
            props.setDueDate(TaxDue, "Tax");
          }}
        ></Button>
      </div>
    </>
  );
};

export default TaxModal;
