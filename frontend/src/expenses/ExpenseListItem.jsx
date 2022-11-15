import React from "react";
import "./Expenses.css";

const ExpenseListItem = (props) => {
  const getExpenseDate = function (expenseDate) {
    const preformatDate = new Date(expenseDate);
    console.log(preformatDate);
    const date = preformatDate.getDate();
    const month = preformatDate.getMonth();
    const year = preformatDate.getFullYear();
    return `${date}/${month}/${year}`;
  };
  return (
    <div key={props.e._id} className="expenseListItem">
      <p style={{ width: "10%" }}>{getExpenseDate(props.e.date)}</p>
      <p style={{ width: "10%" }}>{props.e.category}</p>
      <p style={{ width: "35%" }}>{props.e.description}</p>
      <p style={{ width: "15%", marginLeft: "auto", marginRight: "1em", fontSize: "1.25em" }}>
        £ {parseFloat(props.e.value).toFixed(2)}
      </p>
      <div className="expenseOptions" style={{ marginLeft: "auto", width: "8%" }}>
        <p className="material-icons">edit</p>
        <p className="material-icons"></p>
        <p className="material-icons">close</p>
      </div>
    </div>
  );
};

export default ExpenseListItem;
