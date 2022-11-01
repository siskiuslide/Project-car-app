import React from "react";
import "./Journal.css";
import JournalItem from "./JournalItem";

const Journal = (props) => {
  return (
    <div className="JournalContainer">
      <p>To-do:</p>
      {props.todo
        .filter((i) => {
          return i.completed === false;
        })
        .map((i) => {
          return <JournalItem item={i}></JournalItem>;
        })}

      <p>Completed:</p>
      {props.todo
        .filter((i) => i.completed === true)
        .map((i) => {
          return <JournalItem item={i}></JournalItem>;
        })}
    </div>
  );
};

export default Journal;
