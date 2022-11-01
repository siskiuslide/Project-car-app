import React from "react";
import { Link } from "react-router-dom";
import "./JournalEntries.css";
import "../../App.css";
import { useEffect, useState } from "react";

const Entry = (props) => {
  const [date, setDate] = useState(new Date(props.date).getDate());
  const [month, setMonth] = useState(new Date(props.date).getMonth());
  const [year, setYear] = useState(new Date(props.date).getFullYear());

  return (
    <div className="Entry">
      <p style={{ width: "15%" }}>{`${date}/${month}/${year}`}</p>
      <p style={{ width: "15%", textTransform: "capitalize" }}>{props.category}</p>
      <p style={{ width: "35%" }}>{props.description}</p>
      <p style={{ width: "20%", textAlign: "center" }} className="material-icons">
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
