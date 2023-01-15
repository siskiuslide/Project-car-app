import React from "react";
import "./Expenses.css";

const ExpenseListItem = (props) => {
  const getExpenseDate = function (expenseDate) {
    const preformatDate = new Date(expenseDate);
    if (preformatDate != "Invalid Date") {
      const date = preformatDate.getDate();
      const month = preformatDate.getMonth() + 1;
      const year = preformatDate.getFullYear();
      return `${date}/${month}/${year}`;
    }
  };

  return (
    <div className="expenseListItem" id={props.e._id}>
      <p style={{ width: "10%" }}>{getExpenseDate(props.e.date)}</p>
      <p style={{ width: "10%" }}>{props.expenseVehicleFinder(props.e.vehicleId)}</p>
      <p style={{ width: "10%" }}>{props.e.category}</p>
      <p style={{ width: "40%" }}>{props.e.description}</p>
      <p style={{ width: "15%", marginLeft: "auto", marginRight: "1em", fontSize: "1.25em" }}>
        £ {parseFloat(props.e.value).toFixed(2)}
      </p>
      <div className="expenseOptions" style={{ marginLeft: "auto", width: "8%" }}>
        <p className="material-icons">edit</p>
        <p className="material-icons"></p>
        <p className="material-icons" onClick={props.deleteExpenseHandler}>
          delete
        </p>
      </div>
    </div>
  );
};

export default ExpenseListItem;
