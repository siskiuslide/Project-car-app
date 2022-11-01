import React from "react";
import "./JournalEntries.css";
import "./../Dashboard.css";
import Entry from "./Entry";
import { Link } from "react-router-dom";

const JournalEntries = (props) => {
  return (
    <Link className="JournalEntries GridItem" to={props.link}>
      <p className="GridItemText">Recent entries</p>
      <div className="EntryContainer">
        <div className="Entry">
          <p style={{ width: "10%" }}>Date</p>
          <p style={{ width: "15%" }}>Category</p>
          <p style={{ width: "30%" }}>Description</p>
          <p style={{ width: "20%" }}>Completed?</p>
          <p style={{ width: "10%" }}></p>
        </div>
        {props.todo.slice(0, 3).map((el) => {
          return (
            <Entry
              key={el.id}
              entryId={el.id}
              vehicleId={el.vehicleId}
              category={el.category}
              description={el.description}
            ></Entry>
          );
        })}
        {/* {console.log(props.todo)} */}
      </div>
    </Link>
  );
};

export default JournalEntries;
