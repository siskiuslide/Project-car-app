import React from "react";
import { useState } from "react";
import Modal from "../Components/Modal";
import CreditExpenseModal from "./CreditExpenseModal";
import "./Expenses.css";

const ExpenseListItem = (props) => {
  const [showModal, setShowModal] = useState(false);
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

  return (
    <>
      {showModal && (
        <Modal show={showModal} onClose={modalCloseHandler}>
          <CreditExpenseModal e={props.e} reg={reg}></CreditExpenseModal>
        </Modal>
      )}
      <div className="expenseListItem" id={props.e._id}>
        <p style={{ width: "10%" }}>{getExpenseDate(props.e.date)}</p>
        <p style={{ width: "10%" }}>{reg}</p>
        <p style={{ width: "10%" }} className={`expense-category category-${props.e.category} `}>
          {" "}
          {props.e.category}
        </p>
        <p style={{ width: "40%" }}>{props.e.description}</p>
        <p style={{ width: "15%", marginLeft: "auto", marginRight: "1em", fontSize: "1.25em" }}>
          £ {parseFloat(props.e.value).toFixed(2)}
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
