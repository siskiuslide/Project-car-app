import React from "react";
import Button from "./Button";
import "./Modal.css";

const Modal = function (props) {
  const modalClass = props.show ? "show-modal" : "hide-modal";

  return (
    <div className={modalClass + ` modal`}>
      <div className="modal-window">
        <h2 className="modal-heading">{props.heading}</h2>
        {props?.children}
        <Button color="green" value="Sell"></Button>
        <Button color="red" value="Back" onClick={props.onClose}></Button>
      </div>
    </div>
  );
};

export default Modal;
