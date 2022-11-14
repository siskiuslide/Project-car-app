import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const JournalItem = (props) => {
  const [date, setDate] = useState(new Date(props.item.createdAt).getDate());
  const [month, setMonth] = useState(new Date(props.item.createdAt).getMonth());
  const [year, setYear] = useState(new Date(props.item.createdAt).getFullYear());

  return (
    <div
      className="JournalItem"
      id={props.item._id}
      style={props.item.completed ? { opacity: "60%" } : { opacity: "100%" }}
    >
      <p style={{ width: "10%" }}>{date + "/" + month + "/" + year}</p>
      <p style={{ textTransform: "capitalize", width: "10%" }}>{props.item.category}</p>
      <p style={{ width: "25%" }}>{props.item.description}</p>
      <p
        style={{ width: "15%", textAlign: "center" }}
        className="completedBox material-icons"
        onClick={props.completeBoolHandler}
      >
        {props.item.completed ? "check_box" : "check_box_outline_blank"}
      </p>
      <div className="options" style={{ display: "flex", width: "10%" }}>
        <p className="material-icons">edit</p>
        <p className="material-icons" onClick={props.deleteEntryHandler}>
          delete
        </p>
      </div>
    </div>
  );
};
export default JournalItem;
