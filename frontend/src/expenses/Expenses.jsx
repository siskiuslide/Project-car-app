import React from "react";
import "./Expenses.css";
import "../App.css";
import "../GeneralCSS/forms.css";
import { useState } from "react";
import Button from "../Components/Button";
import NewExpenseForm from "./NewExpenseForm";

const Expenses = (props) => {
  const [showForm, setShowForm] = useState(false);
  const addExpenseHandler = (e) => {
    setShowForm(true);
  };

  return (
    <div className="expenseContainer">
      {showForm === false ? (
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "2em" }}>Expense List: </p>
          <Button style={{ marginLeft: "auto" }} value="Add Expense" onClick={addExpenseHandler}></Button>
        </div>
      ) : (
        <NewExpenseForm garage={props.garage} showForm={showForm} setShowForm={setShowForm}></NewExpenseForm>
      )}
      <div className="ExpenseList">
        <div className="expenseListItem">
          <p style={{ width: "10%" }}>Date</p>
          <p style={{ width: "10%" }}>Category</p>
          <p style={{ width: "35%" }}>Description</p>
          <p style={{ width: "10%", marginLeft: "auto", marginRight: "1em" }}>Value</p>
          <p style={{ width: "8%", marginLeft: "auto", marginRight: "1em" }}>Options</p>
        </div>
        {props.expenses.map((e) => {
          return (
            <div key={e._id} className="expenseListItem">
              <p style={{ width: "10%" }}>{e.date}</p>
              <p style={{ width: "10%" }}>{e.category}</p>
              <p style={{ width: "35%" }}>{e.description}</p>
              <p style={{ width: "10%", marginLeft: "auto", marginRight: "1em", fontSize: "1.25em" }}>
                £ {e.value.toFixed(2)}
              </p>
              <div className="expenseOptions" style={{ marginLeft: "auto", width: "8%" }}>
                <p className="material-icons">edit</p>
                <p className="material-icons"></p>
                <p className="material-icons">close</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Expenses;
