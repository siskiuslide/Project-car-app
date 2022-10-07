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
    console.log(setShowForm);
  };

  return (
    <div className="expenseContainer">
      {showForm === false ? (
        <Button value="Add Expense" onClick={addExpenseHandler}></Button>
      ) : (
        <NewExpenseForm garage={props.garage} showForm={showForm} setShowForm={setShowForm}></NewExpenseForm>
      )}
    </div>
  );
};

export default Expenses;
