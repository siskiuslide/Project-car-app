import React from "react";
import "./Expenses.css";
import "../App.css";
import "../GeneralCSS/forms.css";
import { useState } from "react";
import Button from "../Components/Button";
import NewExpenseForm from "./NewExpenseForm";
import ExpenseListItem from "./ExpenseListItem";

const Expenses = (props) => {
  const expenseDeepCopy = JSON.parse(JSON.stringify(props.expenses)); // this is to allow sorting back into original order
  const [expenses, setExpenses] = useState(expenseDeepCopy);
  const [showForm, setShowForm] = useState(false);
  const [sortValue, setSortValue] = useState(null);
  const addExpenseHandler = (e) => {
    setShowForm(true);
  };

  const sortMonthHandler = () => {};

  const sortValueHandler = () => {
    if (!sortValue) {
      setSortValue("descending");
      const descending = expenses.sort((a, b) => {
        return a.value - b.value;
      });
      return setExpenses([...descending]);
    }
    if (sortValue === "descending") {
      setSortValue("ascending");
      const ascending = expenses.sort((a, b) => {
        return b.value - a.value;
      });
      return setExpenses([...ascending]);
    }
    if (sortValue === "ascending") {
      setSortValue(null);
      return setExpenses(props.expenses);
    }
  };

  return (
    <div className="expenseContainer">
      {showForm === false ? (
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "2em" }}>Expense List: </p>
          <Button style={{ marginLeft: "auto" }} value="Add Expense" onClick={addExpenseHandler}></Button>
        </div>
      ) : (
        <NewExpenseForm
          garage={props.garage}
          showForm={showForm}
          setShowForm={setShowForm}
          expenses={props.expenses}
        ></NewExpenseForm>
      )}
      <div className="ExpenseList">
        <div className="expenseListItem headings" style={{ paddingBlock: "1em", borderBottom: " solid white 1px" }}>
          <p style={{ width: "10%" }}>Date</p>
          <p style={{ width: "10%" }}>Category</p>
          <p style={{ width: "35%" }}>Description</p>
          <p style={{ width: "15%", marginLeft: "auto", marginRight: "1em" }}>Value</p>
          <p style={{ width: "8%", marginLeft: "auto", marginRight: "1em" }}>Options</p>
        </div>
        <div className="listOptions">
          <p className="material-icons" onClick={sortMonthHandler}>
            calendar_month
          </p>
          <p className="material-icons" onClick={sortValueHandler}>
            currency_pound
          </p>
        </div>
        {expenses.map((e) => {
          return <ExpenseListItem e={e} key={e._id}></ExpenseListItem>;
        })}
      </div>
    </div>
  );
};

export default Expenses;
