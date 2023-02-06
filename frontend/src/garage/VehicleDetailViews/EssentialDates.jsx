import React from "react";
import "./EssentialDates.css";

const EssentialDates = (props) => {
  const dueDateStyling = function (dueDate) {
    const due = new Date(dueDate);
    const today = new Date(Date.now());
    const difference = due - today;
    const days = difference / (1000 * 60 * 60 * 24);
    console.log(days);

    if (days >= 31) {
      return { background: "darkgreen" };
    }

    if (days < 31) {
      return { background: "amber" };
    }
    if (days < 0) {
      return { background: "red" };
    }
  };

  dueDateStyling("03-22-2023");
  return (
    <div className="essential-dates">
      <div className="MOT-date" style={dueDateStyling("11-23-2023")}>
        <p>MOT</p>
        <p className="due-date">
          <span>Due: </span>23rd November 2023
        </p>
      </div>
      <div className="TAX-date" style={dueDateStyling("01-10-2024")}>
        <p>Tax</p>
        <p className="due-date">
          <span>Due: </span> 10th January 2024
        </p>
      </div>
      <div className="insurance-date" style={dueDateStyling("08-04-2023")}>
        <p>Insurance</p>
        <p className="due-date">
          <span>Due: </span>4th August 2023
        </p>
      </div>
    </div>
  );
};

export default EssentialDates;
