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
        <Button value="Add Expense" onClick={addExpenseHandler}></Button>
      ) : (
        <NewExpenseForm garage={props.garage} showForm={showForm} setShowForm={setShowForm}></NewExpenseForm>
      )}
      <div className="ExpenseList">
        {props.expenses.map((e) => {
          return (
            <div key={e._id} className="expenseListItem">
              <p style={{ width: "10%" }}>{e.date}</p>
              <p style={{ width: "10%" }}>{e.category}</p>
              <p style={{ width: "35%" }}>{e.description}</p>
              <p style={{ width: "10%", marginLeft: "auto", marginRight: "1em", fontSize: "1.25em" }}>
                £ {e.value.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Expenses;
