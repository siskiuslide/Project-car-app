import React, { useState } from "react";
import Button from "../Components/Button";
import { Link, Redirect } from "react-router-dom";
import "../GeneralCSS/forms.css";
import "./AddVehicleForm.css";

const AddVehicleForm = (props) => {
  const [vehicleType, setVehicleType] = useState("car");
  const [manufacturer, setManufacturer] = useState("Alfa Romeo");
  const [model, setModel] = useState();
  const [variant, setVariant] = useState();
  const [reg, setReg] = useState();
  const [year, setYear] = useState();
  const [buyPrice, setBuyPrice] = useState();
  const [purchaseDate, setPurchaseDate] = useState();
  const [purpose, setPurpose] = useState("daily");
  const [owner, setOwner] = useState("");
  const [buyMileage, setBuyMileage] = useState();
  const [mileage, setMileage] = useState();

  const [formValid, setFormValidity] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const formSubmitHandler = (e) => {
    console.log(formValid);
    if (!vehicleType || !manufacturer || !model || !year || !reg || !buyPrice) {
      return setFormValidity(false);
    }
    setFormValidity(true);
    const newVehicle = {
      type: vehicleType,
      manufacturer: manufacturer,
      model: model,
      variant: variant,
      year: year,
      reg: reg,
      purpose: purpose,
      boughtFor: buyPrice,
      purchaseDate: purchaseDate,
      owner: owner,
      buyMileage: buyMileage,
      currentMileage: mileage,
    };
    const addVehicle = fetch("http://127.0.0.1:4000/garage", {
      method: "POST",
      body: JSON.stringify(newVehicle),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    props.garage.push(newVehicle);
    setRedirect(true);
  };

  return (
    <>
      <div>{redirect && <Redirect to="/garage"></Redirect>}</div>
      <div className="formContainer">
        <p style={{ fontSize: "1.5em", textAlign: "center" }}> New Vehicle</p>
        <form className="VehicleForm" action="/garage" method="post">
          <label>Vehicle Type</label>
          <select
            onChange={(e) => {
              setVehicleType(e.target.value);
            }}
          >
            <option value="none">Please Select</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="van">Van</option>
          </select>
          <label>Manufacturer</label>
          <select
            placeholder="Select"
            onChange={(e) => {
              setManufacturer(e.target.value);
            }}
          >
            <option value="none">Please Select</option>
            {props.vehicleData.map((m) => {
              return (
                <option key={m.brand} value={m.brand}>
                  {m.brand}
                </option>
              );
            })}
          </select>
          <div className="formRowFlex">
            <div className="formRowItemNV">
              <label>Model </label>
              <select
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              >
                <option value="none">Select</option>
                {props.vehicleData
                  .find((item) => {
                    return item.brand === manufacturer;
                  })
                  .models.map((item, i) => {
                    return <option key={i}>{item}</option>;
                  })}
              </select>
            </div>
            <div className="formRowItemNV">
              <label>Variant </label>
              <input
                type="text"
                onChange={(e) => {
                  setVariant(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="formRowFlex">
            <div className="formRowItemNV">
              <label>Reg</label>
              <input
                type="text"
                onChange={(e) => {
                  setReg(e.target.value);
                }}
              ></input>
            </div>
            <div className="formRowItemNV">
              <label>Year</label>
              <input
                type="number"
                onChange={(e) => {
                  setYear(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="formRowFlex">
            <div className="formRowItemNV">
              <label>Purpose</label>
              <select
                onChange={(e) => {
                  setPurpose(e.target.value);
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekend">Weekend</option>
                <option value="summer">Summer</option>
                <option value="track">Track</option>
                <option value="show">Show</option>
                <option value="project">Project</option>
                <option value="resale">Resale</option>
                <option value="drift">Drift</option>
              </select>
            </div>
            <div className="formRowItemNV">
              <label>Buy Price</label>
              <input
                type="number"
                onChange={(e) => {
                  setBuyPrice(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="formRowFlex">
            <div className="formRowItemNV">
              <label htmlFor="date">Buy Date</label>
              <input
                type="date"
                id="date"
                placeholder={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
              ></input>
            </div>
            <div className="formRowItemNV">
              <label htmlFor="owner">Name on V5</label>
              <input
                type="text"
                id="v5name"
                placeholder="e.g John Smith"
                value={owner}
                onChange={(e) => {
                  setOwner(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="formRowFlex">
            <div className="formRowItemNV">
              <label htmlFor="buyMileage">Mileage (buy)</label>
              <input type="number" onChange={(e) => setBuyMileage(e.target.value)} />
            </div>
            <div className="formRowItemNV">
              <label htmlFor="currentMileage">Mileage (now)</label>
              <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} />
            </div>
          </div>
        </form>
        <div className="buttonarea">
          <Button value="Submit" style={{ justifySelf: "right" }} onClick={formSubmitHandler}></Button>
          <Link to="/garage">
            <Button value="Back" back={true}></Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddVehicleForm;
