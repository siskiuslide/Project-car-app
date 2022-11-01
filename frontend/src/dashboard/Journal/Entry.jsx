import React from "react";
import { Link } from "react-router-dom";
import "./JournalEntries.css";
import "../../App.css";

const Entry = (props) => {
  return (
    <div className="Entry">
      <p style={{ width: "10%" }}>{props.date}</p>
      <p style={{ width: "15%" }}>{props.category}</p>
      <p style={{ width: "30%" }}>{props.description}</p>
      <p style={{ width: "20%" }} className="material-icons">
        {props.completed ? "check_box" : "check_box_outline_blank"}
      </p>
      <div className="options" style={{ display: "flex", width: "10%" }}>
        <p className="material-icons">edit</p>
        <p className="material-icons">delete</p>
      </div>
    </div>
  );
};

export default Entry;
