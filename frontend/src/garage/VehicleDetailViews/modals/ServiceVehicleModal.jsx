import React, { useState } from "react";
import Button from "../../../Components/Button";
import "../../../Components/Modal.css";

const ServiceVehicleModal = (props) => {
  const [serviceDate, setServiceDate] = useState();
  const [serviceMileage, setServiceMileage] = useState(props?.currentMileage);
  const [serviceType, setServiceType] = useState();

  return (
    <>
      <h2 className="modal-heading">Service Vehicle</h2>
      <p className="modal-description">Update your vehicle service history.</p>
      <form>
        <label>Date</label>
        <input type="date" value={serviceDate} onChange={(e) => setServiceDate(e.target.value)} />
        <label>Mileage</label>
        <input
          type="Number"
          value={serviceMileage}
          placeholder={props.currentMileage}
          onChange={(e) => setServiceMileage(e.target.value)}
        />
        <label>Service Type</label>
        <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
          <option value="basic">Basic (Oil & Air filter)</option>
          <option value="minor">Minor (Oil/filter + spark plugs + air & pollen filter)</option>
          <option value="major">Major (Oil/filter + spark plugs + air filter + fuel filter + coolant)</option>
          <option value="full service">Major + belts, gearbox service</option>
        </select>
      </form>
      <div className="buttonarea">
        <Button value="Submit"></Button>
      </div>
    </>
  );
};

export default ServiceVehicleModal;
