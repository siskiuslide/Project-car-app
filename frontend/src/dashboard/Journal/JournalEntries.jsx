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
        <Entry
          entryId="1"
          vehicleId="1"
          date="26/09/2022"
          category="work"
          description="check coilovers for adjustability"
        ></Entry>
        <Entry></Entry>
        <Entry></Entry>
      </div>
    </Link>
  );
};

export default JournalEntries;
