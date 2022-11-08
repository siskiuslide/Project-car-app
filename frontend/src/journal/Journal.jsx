import React from "react";
import { useState, useEffect } from "react";
import "./Journal.css";
import JournalItem from "./JournalItem";

const Journal = (props) => {
  const [todo, setTodo] = useState(props.todo);

  const completeBoolHandler = function (e) {
    const targetId = e.target.parentNode.id;
    const todoCopy = [...todo];
    const targetItem = todoCopy.find((el) => el._id === targetId);
    const index = todoCopy.indexOf(targetItem);
    targetItem.completed ? (todoCopy[index].completed = false) : (todoCopy[index].completed = true);
    setTodo(todoCopy);
  };

  return (
    <div className="JournalContainer">
      <p>To-do:</p>
      <p className="material-icons" onClick={props.setRefreshHandler()}>
        refresh
      </p>
      {todo
        .sort((a, b) => {
          return Number(a.completed) - Number(b.completed);
        })
        .map((i, index) => {
          return <JournalItem item={i} key={i._id} completeBoolHandler={completeBoolHandler}></JournalItem>;
        })}
    </div>
  );
};

export default Journal;
