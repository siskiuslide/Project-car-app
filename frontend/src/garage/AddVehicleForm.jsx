import React from "react";
import "./AddVehicleForm.css";

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
  return (
    <div className="formContainer">
      <p style={{ fontSize: "1.5em", textAlign: "center" }}> New Vehicle</p>
      <form className="VehicleForm" action="/garage" method="post">
        <label>Vehicle Type</label>
        <select>
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="van">Van</option>
        </select>
        <label>Manufacturer:</label>
        <select placeholder="Select">
          {manufacturers.map((m) => {
            return <option value={m}>{m}</option>;
          })}
        </select>
        <div className="formRowFlex">
          <div style={{ display: "block" }}>
            <label>Model: </label>
            <input type="text"></input>
          </div>
          <div>
            <label>Variant: </label>
            <input type="text"></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
