import React from "react";
import "./Dashboard.css";
import "../App.css";
import Count from "./VehicleCount";
import TotalCosts from "./TotalCosts";
import JournalEntries from "./Journal/JournalEntries";

const Dashboard = (props) => {
  return (
    <>
      {/* <header className="Header">Dashboard</header> */}
      <div className="DashboardGrid">
        <Count link="/garage" garage={props.garage}></Count>
        <TotalCosts link="/expenses" expenses={props.expenses}></TotalCosts>
        <JournalEntries link="/journal" todo={props.todo}>
          {" "}
        </JournalEntries>
      </div>
    </>
  );
};

export default Dashboard;
