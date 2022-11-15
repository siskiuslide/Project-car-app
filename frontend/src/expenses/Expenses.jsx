import React from "react";
import "./Expenses.css";
import "../App.css";
import "../GeneralCSS/forms.css";
import { useState, useEffect } from "react";
import Button from "../Components/Button";
import NewExpenseForm from "./NewExpenseForm";
import ExpenseListItem from "./ExpenseListItem";

const Expenses = (props) => {
  const [expenses, setExpenses] = useState(props.expenses);
  const deepClone = structuredClone(props.expenses);
  const [removed, setRemoved] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sortValue, setSortValue] = useState(null);
  const [dateSort, setDateSort] = useState();
  const [dateSortIcon, setDateSortIcon] = useState();

  useEffect(() => setExpenses(deepClone), []);
  const addExpenseHandler = (e) => {
    setShowForm(true);
  };

  const dateSortHandler = function (e) {
    const expensesClone = structuredClone(props.expenses);

    if (!dateSort) {
      setDateSort("descending");
      setDateSortIcon("keyboard_arrow_down");

      expensesClone.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      setExpenses(expensesClone);
    }
    if (dateSort === "descending") {
      setDateSort("ascending");
      setDateSortIcon("keyboard_arrow_up");
      expensesClone.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setExpenses(expensesClone);
    }
    if (dateSort === "ascending") {
      setDateSort();
      setDateSortIcon(null);
      setExpenses(expensesClone);
    }
  };

  const sortValueHandler = () => {
    if (sortValue === null) {
      setSortValue("descending");
      return expenses.sort((a, b) => {
        return a.value - b.value;
      });
    }
    if (sortValue === "descending") {
      setSortValue("ascending");
      return expenses.sort((a, b) => {
        return b.value - a.value;
      });
    }
    if (sortValue === "ascending") {
      setSortValue(null);
      return setExpenses(deepClone);
    }
  };

  const deleteExpenseHandler = function (e) {
    const targetId = e.target.parentNode.parentNode.id;
    if (!removed.some((exp) => exp === targetId)) {
      const updateRemoved = [...removed, targetId];
      setRemoved(updateRemoved);

      const req = fetch("http://127.0.0.1:4000/expenses", {
        method: "delete",
        body: JSON.stringify({ id: targetId }),
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => {
          removed.forEach((id) => {
            const index = deepClone.findIndex((ex) => ex._id == id);
            deepClone.splice(index, 1);
            setExpenses(deepClone);
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="expenseContainer">
      {showForm === false ? (
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "2em" }}>Expense List: </p>
          <Button
            style={{ marginLeft: "auto", height: "auto" }}
            value="Add Expense"
            onClick={addExpenseHandler}
          ></Button>
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
          {dateSortIcon ? (
            <p className="material-icons" onClick={dateSortHandler}>
              {dateSortIcon}
            </p>
          ) : null}
          <p className="material-icons" onClick={dateSortHandler}>
            calendar_month
          </p>
          <p className="material-icons" onClick={sortValueHandler}>
            currency_pound
          </p>
        </div>
        {expenses.map((e) => {
          return <ExpenseListItem e={e} key={e._id} deleteExpenseHandler={deleteExpenseHandler}></ExpenseListItem>;
        })}
      </div>
    </div>
  );
};

export default Expenses;
