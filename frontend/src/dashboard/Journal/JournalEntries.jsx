import React from "react";
import "./JournalEntries.css";
import "./../Dashboard.css";
import Entry from "./Entry";
import { Link } from "react-router-dom";

const JournalEntries = (props) => {
  return (
    <Link className="JournalEntries GridItem" to={props.link}>
      <p className="GridItemText">Recent entries</p>
      <p></p>
      <div className="EntryContainer">
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
