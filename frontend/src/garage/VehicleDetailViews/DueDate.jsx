import React from "react";

const DueDate = (props) => {
  return (
    <div className="essential-date" style={props.dueDateStyling(props.dueDate)} onClick={props.onClick}>
      <p className="date-title">
        {props.title}
        {props.getRemainingDays(props.dueDate) < 0 && <span style={{ fontWeight: "bold" }}> - Expired!</span>}
      </p>
      <p className="remaining-days">{props.getRemainingDays(props.dueDate)}</p>

      <p className="due-date">
        <span>Due: </span>
        {props.getFullDate(props.dueDate)}
      </p>
    </div>
  );
};

export default DueDate;
