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
        <TotalCosts link="/expenses"></TotalCosts>
        <JournalEntries link="/journal"> </JournalEntries>
      </div>
    </>
  );
};

export default Dashboard;
