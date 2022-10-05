import React from "react";
import "./Button.css";
const Button = (props) => {
  return (
    <button
      className="button"
      style={{
        padding: "0.5em",
        backgroundColor: "rgb(51, 153, 194)",
        color: "white",
        fontWeight: "bold",
        width: "6em",
        borderRadius: "5px",
        marginBlock: "0.5em",
      }}
    >
      {props.value}
    </button>
  );
};

export default Button;
