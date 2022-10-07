import React from "react";
import Button from "../Components/Button";

const NewExpenseForm = (props) => {
  const formSubmitHandler = (e) => {
    e.preventDefault();
  };
  const formBackHandler = (e) => {
    e.preventDefault();
    props.setShowForm(false);
  };
  return (
    <div className="formContainer">
      <p style={{ fontSize: "1.5em", textAlign: "center" }}> Create expense</p>
      <form action="http://localhost:4000/expenses" method="post">
        <label htmlFor="car">Select Car: </label>
        <select id="car">
          {props.garage.map((v) => (
            <option key={v._id} value={v.id}>
              {v.manufacturer + " " + v.model + " - " + v.reg.toUpperCase()}{" "}
            </option>
          ))}
        </select>
        <div className="formRowFlex">
          <div>
            <label htmlFor="date">Date: </label>
            <input type="date" id="date"></input>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label htmlFor="category">Category: </label>
            <select id="category" style={{ display: "inline" }}>
              <option value="purchase">Purchase</option>
              <option value="insurance">Insurance</option>
              <option value="tax">Tax</option>
              <option value="fuel">Fuel</option>
              <option value="servicing">Servicing</option>
              <option value="parts">Parts</option>
              <option value="cleaning">Cleaning</option>
              <option value="modification">Modification</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>
        <label htmlFor="description">Description: </label>
        <input type="text" id="description"></input>
        {/* <input type="submit"></input> */}
        <div
          className="buttonarea"
          style={{ display: "flex", flexDirection: "row", justifyContent: "end", marginTop: "2em" }}
        >
          <Button value="Submit"></Button>
          <Button value="Back" back={true} onClick={formBackHandler}></Button>
        </div>
      </form>
    </div>
  );
};

export default NewExpenseForm;
