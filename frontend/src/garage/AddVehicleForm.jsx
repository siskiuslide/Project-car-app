import React, { useState } from "react";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import "../GeneralCSS/forms.css";

const AddVehicleForm = () => {
  const manufacturers = [
    "Abarth",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Austin",
    "Bentley",
    "BMW",
    "Bugatti",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Citroën",
    "Dacia",
    "Daewoo",
    "Daihatsu",
    "Dodge",
    "Donkervoort",
    "DS",
    "Ferrari",
    "Fiat",
    "Fisker",
    "Ford",
    "Honda",
    "Hummer",
    "Hyundai",
    "Infiniti",
    "Iveco",
    "Jaguar",
    "Jeep",
    "Kia",
    "KTM",
    "Lada",
    "Lamborghini",
    "Lancia",
    "Land Rover",
    "Landwind",
    "Lexus",
    "Lotus",
    "Maserati",
    "Maybach",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "MG",
    "Mini",
    "Mitsubishi",
    "Morgan",
    "Nissan",
    "Opel",
    "Peugeot",
    "Porsche",
    "Renault",
    "Rolls-Royce",
    "Rover",
    "Saab",
    "Seat",
    "Skoda",
    "Smart",
    "SsangYong",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Vauxhall",
    "Volvo",
  ];
  const [vehicleType, setVehicleType] = useState("car");
  const [manufacturer, setManufacturer] = useState("abarth");
  const [model, setModel] = useState();
  const [variant, setVariant] = useState();
  const [reg, setReg] = useState();
  const [year, setYear] = useState();
  const [buyPrice, setBuyPrice] = useState();
  const [purpose, setPurpose] = useState("daily");

  const formSubmitHandler = (e) => {
    const newVehicle = {
      type: vehicleType,
      manufacturer: manufacturer,
      model: model,
      variant: variant,
      year: year,
      reg: reg,
      purpose: purpose,
      boughtFor: buyPrice,
    };
    console.log(newVehicle);

    const addVehicle = fetch("http://127.0.0.1:4000/garage", {
      method: "POST",
      body: JSON.stringify(newVehicle),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="formContainer">
      <p style={{ fontSize: "1.5em", textAlign: "center" }}> New Vehicle</p>
      <form className="VehicleForm" action="/garage" method="post">
        <label>Vehicle Type</label>
        <select
          onChange={(e) => {
            setVehicleType(e.target.value);
          }}
        >
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="van">Van</option>
        </select>
        <label>Manufacturer:</label>
        <select
          placeholder="Select"
          onChange={(e) => {
            setManufacturer(e.target.value);
          }}
        >
          {manufacturers.map((m) => {
            return (
              <option key={m} dvalue={m}>
                {m}
              </option>
            );
          })}
        </select>
        <div className="formRowFlex">
          <div className="formRowItemNV">
            <label>Model: </label>
            <input
              type="text"
              onChange={(e) => {
                setModel(e.target.value);
              }}
            ></input>
          </div>
          <div className="formRowItemNV">
            <label>Variant: </label>
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
            <label>Reg: </label>
            <input
              type="text"
              onChange={(e) => {
                setReg(e.target.value);
              }}
            ></input>
          </div>
          <div className="formRowItemNV">
            <label>Year </label>
            <input
              type="text"
              onChange={(e) => {
                setYear(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="formRowFlex">
          <div className="formRowItemNV">
            <label>Purpose: </label>
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
            <label>Buy Price: </label>
            <input
              type="text"
              onChange={(e) => {
                setBuyPrice(e.target.value);
              }}
            ></input>
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
  );
};

export default AddVehicleForm;
