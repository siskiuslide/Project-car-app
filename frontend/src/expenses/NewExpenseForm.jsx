import React from "react";
import { useState } from "react";
import Button from "../Components/Button";
import Invalid from "../Components/Invalid";
import "../GeneralCSS/forms.css";

const NewExpenseForm = (props) => {
  const [formValid, setFormValidity] = useState(true);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!vehicle || !date || !category || !value) {
      return setFormValidity(false);
    }
    const expense = {
      vehicleId: vehicle,
      date: date,
      category: category,
      description: desc,
      value: value,
    };
    setFormValidity(true);
    props.expenses.push(expense);
    console.log(expense);
    const newExpense = fetch("http://localhost:4000/expenses", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    })
      .then((res) => console.log(res))
      .then(() => {
        setDate("mm/dd/yyyy");
        setCategory("");
        setDesc("");
        setValue(0);
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      props.setShowForm(false);
    }, 250);
  };
  const formBackHandler = (e) => {
    e.preventDefault();
    props.setShowForm(false);
  };

  //state to be sent to server as expense
  const [vehicle, setVehicle] = useState();
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [desc, setDesc] = useState();
  const [value, setValue] = useState(0);

  return (
    <div className="formContainer">
      <p style={{ fontSize: "1.5em", textAlign: "center" }}> Create expense</p>
      <form action="http://localhost:4000/expenses" method="post">
        <label htmlFor="car">Select Car: </label>
        <select
          id="car"
          onChange={(e) => {
            setVehicle(e.target.value);
          }}
          placeholder={vehicle}
        >
          <option defaultValue="" hidden="hidden">
            Choose Here
          </option>
          <option value="na">N/A</option>
          {props.garage.map((v) => (
            <option key={v._id} value={v._id}>
              {v.manufacturer + " " + v.model + " - " + v.reg.toUpperCase()}{" "}
            </option>
          ))}
        </select>
        <div className="formRowFlex">
          <div className="formRowItemNE">
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              id="date"
              placeholder={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></input>
          </div>
          <div className="formRowItemNE">
            <label htmlFor="category">Category: </label>
            <select
              id="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option defaultValue="" hidden="hidden">
                {category}
              </option>
              <option value="purchase">Purchase</option>
              <option value="insurance">Insurance</option>
              <option value="tax">Tax</option>
              <option value="fuel">Fuel</option>
              <option value="servicing">Servicing</option>
              <option value="parts">Parts</option>
              <option value="MOT">MOT</option>
              <option value="cleaning">Cleaning</option>
              <option value="modification">Modification</option>
              <option value="accessories">Accessories</option>
              <option value="garage work">Garage Work</option>
              <option value="Toll">Toll</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="formRowFlex">
          <div className="formRowItemNE">
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              id="description"
              style={{}}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></input>
          </div>
          <div className="formRowItemNE">
            <label htmlFor="value">Value: </label>
            <input
              type="number"
              style={{ marginInline: "1em" }}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder={value}
            ></input>
          </div>
        </div>
        <div
          className="buttonarea"
          style={{ display: "flex", flexDirection: "row", justifyContent: "end", marginTop: "2em" }}
        >
          <Button value="Submit" onClick={formSubmitHandler}></Button>
          <Button value="Back" back={true} onClick={formBackHandler}></Button>
        </div>
        {!formValid && <Invalid />}
      </form>
    </div>
  );
};

export default NewExpenseForm;
