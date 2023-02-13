import React, { useState } from "react";
import Modal from "../../Components/Modal";
import DueDate from "./DueDate";
import "./EssentialDates.css";
import MOTModal from "./modals/EssentialDates/MOTModal";
import TaxModal from "./modals/EssentialDates/TaxModal";
import InsuranceModal from "./modals/EssentialDates/InsuranceModal";

const EssentialDates = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContext, setModalContext] = useState(false);

  const showModalHandler = function () {
    return setShowModal(true);
  };
  const closeModalHandler = function () {
    setShowModal(false);
  };

  const getRemainingDays = function (dueDate) {
    const due = new Date(dueDate);
    const today = new Date(Date.now());
    const difference = due - today;
    const days = difference / (1000 * 60 * 60 * 24);
    return days.toFixed();
  };

  const dueDateStyling = function (dueDate) {
    const days = getRemainingDays(dueDate);

    if (days < 1) {
      return { background: "red" };
    }
    if (0 < days && days < 31) {
      return { background: "orange" };
    }
    if (days >= 31) {
      return { background: "darkgreen" };
    }
  };

  const getFullDate = function (dueDate) {
    const due = new Date(dueDate);
    const date = due.getDate();
    const month = due.toLocaleString("default", { month: "long" });
    const year = due.getFullYear();
    return `${date} ${month} ${year}`;
  };

  const setDueDate = function (date, context) {
    const body = { vehicleId: props.vehicle._id };
    if (context === "MOT") {
      body.MOTDue = date;
    }
    if (context === "Tax") {
      body.TaxDue = date;
    }
    if (context === "Insurance") {
      body.InsuranceDue = date;
    }
    const req = fetch("http://127.0.0.1:4000/garage", {
      method: "put",
      body: JSON.stringify(body),
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return closeModalHandler();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {showModal && (
        <Modal show={showModal} onClose={closeModalHandler}>
          {modalContext === "MOT" && <MOTModal setDueDate={setDueDate}></MOTModal>}
          {modalContext === "Tax" && <TaxModal setDueDate={setDueDate}></TaxModal>}
          {modalContext === "Insurance" && <InsuranceModal setDueDate={setDueDate}></InsuranceModal>}
        </Modal>
      )}
      <div className="essential-dates">
        {props.vehicle.MOTDue && (
          <DueDate
            title={"MOT"}
            getRemainingDays={getRemainingDays}
            dueDateStyling={dueDateStyling}
            getFullDate={getFullDate}
            dueDate={props.vehicle?.MOTDue}
            onClick={() => {
              showModalHandler();
              setModalContext("MOT");
            }}
          ></DueDate>
        )}
        {props.vehicle.TaxDue && (
          <DueDate
            title={"Tax"}
            getRemainingDays={getRemainingDays}
            dueDateStyling={dueDateStyling}
            getFullDate={getFullDate}
            dueDate={props.vehicle?.TaxDue}
            onClick={() => {
              showModalHandler();
              setModalContext("Tax");
            }}
            closeModalHandler={closeModalHandler}
          ></DueDate>
        )}
        {props.vehicle.InsuranceDue && (
          <DueDate
            title={"Insurance"}
            getRemainingDays={getRemainingDays}
            dueDateStyling={dueDateStyling}
            getFullDate={getFullDate}
            dueDate={props.vehicle?.InsuranceDue}
            onClick={() => {
              showModalHandler();
              setModalContext("Insurance");
            }}
            closeModalHandler={closeModalHandler}
          ></DueDate>
        )}
      </div>
    </>
  );
};

export default EssentialDates;
