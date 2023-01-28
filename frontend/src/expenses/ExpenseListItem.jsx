import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "../Components/Modal";
import CreditExpenseModal from "./CreditExpenseModal";
import "./Expenses.css";

const ExpenseListItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [outStandingColor, setOutstandingColor] = useState("white");
  const [reg, setReg] = useState(props?.expenseVehicleFinder(props.e.vehicleId) ?? props?.vehicle.reg);
  const getExpenseDate = function (expenseDate) {
    const preformatDate = new Date(expenseDate);
    if (preformatDate != "Invalid Date") {
      const date = preformatDate.getDate();
      const month = preformatDate.getMonth() + 1;
      const year = preformatDate.getFullYear();
      return `${date}/${month}/${year}`;
    }
  };

  const findVehicle = function () {
    return props?.expenseVehicleFinder(props.e.vehicleId);
  };

  const showModalHandler = function () {
    return setShowModal(true);
  };
  const modalCloseHandler = function () {
    return setShowModal(false);
  };

  useEffect(() => {
    if (props.e.outstanding < 0) {
      setOutstandingColor("green");
    }
  }, []);
  return (
    <>
      {showModal && (
        <Modal show={showModal} onClose={modalCloseHandler}>
          <CreditExpenseModal e={props.e} reg={reg}></CreditExpenseModal>
        </Modal>
      )}
      <div className="expenseListItem" id={props.e._id}>
        <p style={{ width: "8%" }}>{getExpenseDate(props.e.date)}</p>
        <p style={{ width: "8%" }}>{reg}</p>
        <p style={{ width: "8%" }} className={`expense-category category-${props.e.category} `}>
          {" "}
          {props.e.category}
        </p>
        <p style={{ width: "24%", textAlign: "start" }}>{props.e.description}</p>
        <p style={{ width: "8%", fontSize: "1.25em" }}>£{parseFloat(props.e.value).toFixed(2)}</p>
        <p className="material-icons" style={{ width: "6%" }}>
          {props.e.credited ? "done" : "close"}
        </p>
        <p style={{ width: "8%" }}>{props.e.credited ? "£" + props.e.creditValue : " "}</p>
        <p style={{ width: "8%", fontSize: "1.2rem", color: `${outStandingColor}` }}>
          {props.e.credited ? "£" + props.e.outstanding.toFixed(2) : ""}
        </p>
        <div className="expenseOptions" style={{ marginLeft: "auto", width: "8%" }}>
          <p className="material-icons">edit</p>
          <p className="material-icons" onClick={props?.deleteExpenseHandler}>
            delete
          </p>
          {props.e.category !== "purchase" && (
            <p
              className="material-icons"
              style={{ marginInline: "3px" }}
              onClick={() => {
                showModalHandler();
              }}
            >
              payments
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpenseListItem;
