import React, { useState } from "react";
import Button from "../../../Components/Button";
import "../../../Components/Modal.css";

const ServiceVehicleModal = (props) => {
  const [serviceDate, setServiceDate] = useState();
  const [serviceMileage, setServiceMileage] = useState(props?.currentMileage);
  const [serviceType, setServiceType] = useState("basic");
  const [serviceDescription, setServiceDescription] = useState();
  const [serviceEnvironment, setServiceEnvironment] = useState("home");

  const serviceVehicle = function () {
    const body = {
      vehicleId: props.vehicleId,
      serviceType,
      serviceDate,
      serviceDescription,
      serviceEnvironment,
      mileageAtService: serviceMileage,
    };
    props.serviceVehicleHandler(body);
  };

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
          <option value="clutch">Clutch</option>
          <option value="timing belt">Timing Belt</option>
          <option value="tyres">Tyres replaced</option>
        </select>
        <label>Description</label>
        <input
          type="text"
          value={serviceDescription}
          onChange={(e) => {
            setServiceDescription(e.target.value);
          }}
        />
        <label>Service Environment</label>
        <select
          value={serviceEnvironment}
          onChange={(e) => {
            setServiceEnvironment(e.target.value);
          }}
        >
          <option value="home">At Home</option>
          <option value="garage">Garage</option>
          <option value="dealer">Dealer</option>
        </select>
      </form>
      <div className="buttonarea">
        <Button value="Submit" onClick={serviceVehicle}></Button>
      </div>
    </>
  );
};

export default ServiceVehicleModal;
