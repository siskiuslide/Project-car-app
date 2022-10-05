import React from "react";
import Button from "../Components/Button";

const NewExpenseForm = (props) => {
  return (
    <div className="formContainer">
      <p style={{ fontSize: "1.5em", textAlign: "center" }}> Create expense</p>
      <form action="http://localhost:4000/expenses" method="post">
        <label for="car">Select Car: </label>
        <select id="car">
          {props.garage.map((v) => (
            <option key={v.id} value={v.id}>
              {v.manufacturer + " " + v.model + " - " + v.reg.toUpperCase()}{" "}
            </option>
          ))}
        </select>
        <div className="formRowFlex">
          <div>
            <label for="date">Date: </label>
            <input type="date" id="date"></input>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label for="category">Category: </label>
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
        <label for="description">Description: </label>
        <input type="text" id="description"></input>
        {/* <input type="submit"></input> */}
        <Button value="Submit" style={{ marginLeft: "auto" }}></Button>
      </form>
    </div>
  );
};

export default NewExpenseForm;
