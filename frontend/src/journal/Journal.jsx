import React from "react";
import { useState, useEffect } from "react";
import "./Journal.css";
import JournalItem from "./JournalItem";

const Journal = (props) => {
  const [todo, setTodo] = useState([
    ...props.todo.sort((a, b) => {
      return Number(a.completed) - Number(b.completed);
    }),
  ]);

  const setCompleteHandler = function (e) {};

  return (
    <div className="JournalContainer">
      <p>To-do:</p>
      <p className="material-icons" onClick={props.setRefreshHandler()}>
        refresh
      </p>
      {todo.map((i, index) => {
        return <JournalItem item={i} key={i._id}></JournalItem>;
      })}
    </div>
  );
};

export default Journal;
