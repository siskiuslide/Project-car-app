import React from "react";
import { useState, useEffect } from "react";
import Button from "../Components/Button";
import "./Journal.css";
import JournalItem from "./JournalItem";

const Journal = (props) => {
  const [todo, setTodo] = useState(props.todo);
  const [entriesViewText, setEntriesViewText] = useState("All");
  const [entriesViewIcon, setEntriesViewIcon] = useState("check_box_outline_blank");

  const entriesViewHandler = function (e) {
    const todoClone = structuredClone(props.todo);

    if (entriesViewText === "All") {
      setEntriesViewText("Completed");
      setEntriesViewIcon("check_box");
      setTodo(todoClone.filter((i) => i.completed));
    }
    if (entriesViewText === "Completed") {
      setEntriesViewText("Incomplete");
      setEntriesViewIcon("check_box_outline_blank");
      setTodo(todoClone.filter((i) => i.completed === false));
    }
    if (entriesViewText === "Incomplete") {
      setEntriesViewText("All");
      setEntriesViewIcon("checklist");
      setTodo(todoClone);
    }
  };

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

  const deleteEntryHandler = function (e) {
    const targetId = e.target.parentNode.parentNode.id;
    console.log(targetId);
    const todoClone = structuredClone(todo);
    const index = todoClone.findIndex((i) => i._id == targetId);
    todoClone.splice(index, 1);
    setTodo(todoClone);

    fetch("http://127.0.0.1:4000/todo", { method: "delete", body: JSON.stringify({ id: targetId }) })
      .then((res) => res)
      .catch((err) => console.log(err));
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "2em" }}>Entries:</p>
        <Button value="Add todo"></Button>
      </div>
      <div className="JournalList">
        <div className="headings JournalItem" style={{ paddingBlock: "1em", borderBottom: "white solid 1px" }}>
          <p style={{ width: "10%" }}>Date</p>
          <p style={{ width: "10%" }}>Category</p>
          <p style={{ width: "25%" }}>Description</p>
          <p style={{ width: "15%", textAlign: "center" }}>Completed?</p>
          <p style={{ width: "10%" }}>Options</p>
        </div>
        <div className="options" style={{ width: "10%", marginLeft: "auto" }}>
          <p className="material-icons">calendar_month</p>
          <p className="material-icons" onClick={entriesViewHandler}>
            {entriesViewIcon}
          </p>
        </div>

        {todo
          .sort((a, b) => {
            return Number(a.completed) - Number(b.completed);
          })
          .map((i, index) => {
            return (
              <JournalItem
                item={i}
                key={i._id}
                completeBoolHandler={completeBoolHandler}
                deleteEntryHandler={deleteEntryHandler}
              ></JournalItem>
            );
          })}
      </div>
    </div>
  );
};

export default Journal;
