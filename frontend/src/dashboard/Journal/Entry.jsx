import React from "react";
import { Link } from "react-router-dom";
import "./JournalEntries.css";
import "../../App.css";

const Entry = (props) => {
  return (
    <div className="Entry">
      <p style={{ fontSize: "1em" }} className="material-icons">
        calendar_month
      </p>
      <p>{props.date}</p>
      <p>{props.category}</p>
      <p>{props.description}</p>
    </div>
  );
};

export default Entry;
