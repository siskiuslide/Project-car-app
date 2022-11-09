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
    const newState = targetItem.completed ? false : true;
    todoCopy[index].completed = newState;
    setTodo(todoCopy);
    updateCompleteState(targetId, newState);
  };

  const updateCompleteState = function (id, newState) {
    const update = fetch("http://localhost:4000/todo", {
      method: "PUT",
      body: JSON.stringify({ id: id, completed: newState }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  };

  return (
    <div className="JournalContainer">
      <p className="">Entries:</p>
      {/* <JournalItem></JournalItem> */}
      <div class="JournalHeaders JournalItem">
        <p style={{ width: "10%" }}>Date</p>
        <p style={{ width: "10%" }}>Category</p>
        <p style={{ width: "25%" }}>Description</p>
        <p style={{ width: "15%", textAlign: "center" }}>Completed?</p>
        <div className="options" style={{ width: "10%" }}>
          <p className="material-icons">calendar_month</p>
          <p className="material-icons">check_box_outline_blank</p>
        </div>
      </div>

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
