import React, { useState } from "react";
import Button from "../Components/Button";
import "./CreditExpenseModal.css";
import ".././Components/Modal.css";

const CreditExpenseModal = function (props) {
  const [creditDate, setCreditDate] = useState(Date.now());
  const [creditValue, setCreditValue] = useState();
  const [creditContext, setCreditContext] = useState();

  const submitCreditRequest = function () {
    const outstanding = props.e.value - creditValue;
    const credit = { credited: true, creditDate, creditValue, creditContext, outstanding };

    const submit = fetch(`http://127.0.0.1:4000/expenses/${props.e._id}/credit`, {
      headers: { "content-type": "application/json" },
      body: JSON.stringify(credit),
      method: "put",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    return submit;
  };

  return (
    <>
      <h2 className="modal-heading">Credit Expense</h2>
      <p className="expense-description">
        <span>{props.reg} - </span>
        <span style={{ textTransform: "capitalize" }}>{props.e.category} - </span>
        <span>{props.e.description} </span>
        <span className="expense-id">{props.e._id} </span>
      </p>
      <p className="modal-description">
        Crediting an expense will deduct the credited value from the expense, leaving a gross value.
      </p>
      <p className="modal-description">Ideal for resale of parts, refunded items, claiming expenses back etc.</p>
      <form className="credit-form">
        <label>Credit Date</label>
        <input type="date" onChange={(e) => setCreditDate(e.target.value)}></input>
        <label>Credit Value</label>
        <input type="number" onChange={(e) => setCreditValue(e.target.value)} placeholder={`£${props.e.value}`}></input>
        <label>Credit Context</label>
        <select onChange={(e) => setCreditContext(e.target.value)}>
          <option value="refund">Refund</option>
          <option value="sale">Sale</option>
          <option value="discount">Discount</option>
          <option value="expense claim">Expense Claim</option>
          <option value="subsidy">Subsidy</option>
          <option value="other">Other</option>
        </select>
      </form>
      <div className="buttonarea">
        <Button value="Credit" onClick={submitCreditRequest}></Button>
      </div>
    </>
  );
};

export default CreditExpenseModal;
