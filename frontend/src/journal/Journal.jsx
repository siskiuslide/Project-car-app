import React from "react";
import "./Journal.css";
import JournalItem from "./JournalItem";

const Journal = (props) => {
  return (
    <div className="JournalContainer">
      {props.todo.map((el) => {
        <JournalItem key={el._id} item={el}></JournalItem>;
      })}
    </div>
  );
};

export default Journal;
