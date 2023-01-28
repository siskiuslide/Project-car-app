import React from "react";
import "./Expenses.css";
import "../App.css";
import "../GeneralCSS/forms.css";
import { useState, useEffect } from "react";
import Button from "../Components/Button";
import NewExpenseForm from "./NewExpenseForm";
import ExpenseListItem from "./ExpenseListItem";
import cloneDeep from "lodash/cloneDeep";

const Expenses = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [removed, setRemoved] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sortValue, setSortValue] = useState(null);
  const [dateSort, setDateSort] = useState();
  const [dateSortIcon, setDateSortIcon] = useState();
  const [category, setCategory] = useState("none");

  useEffect(() => {
    const expensesreq = fetch("http://localhost:4000/expenses")
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data.data);
        return data;
      })
      .catch((err) => console.log(err));
  }, []);

  const addExpenseHandler = (e) => {
    setShowForm(true);
  };

  const dateSortHandler = function (e) {
    const expensesClone = structuredClone(expenses);

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
      // return setExpenses(deepClone);
      return setExpenses([]);
    }
  };

  const filterExpenseCat = function (filter) {
    const expenseClone = cloneDeep(props.expenses);
    if (filter === "none") {
      return setExpenses(props.expenses);
    }
    const filteredList = expenseClone.filter((el) => el.category === filter);
    return setExpenses(filteredList);
  };

  const deleteExpenseHandler = function (e) {
    const targetId = e.target.parentNode.parentNode.id;
    if (!removed.some((exp) => exp === targetId)) {
      setRemoved([...removed, targetId]);
    }

    const req = fetch("http://127.0.0.1:4000/expenses", {
      method: "delete",
      body: JSON.stringify({ id: targetId }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        return setExpenses(data.data);
      })
      .catch((err) => console.log(err));
  };

  const getExpenseVehicle = function (vehicleId) {
    if (props.vehicle) {
      return props.vehicle;
    }
    if (vehicleId === "na") {
      return "N/A";
    }
    const vehicle = props.garage.find((v) => v._id === vehicleId);
    const reg = vehicle.reg;
    return reg.toUpperCase();
  };

  const getExpenseTotal = function () {
    const total = expenses.reduce((current, next) => {
      return (current += Number(next.value));
    }, 0);

    return total.toFixed(2);
  };

  const getOutstandingTotal = function () {
    const credit = getCreditTotal();
    const total = getExpenseTotal();
    return total - credit;
  };

  const getCreditTotal = function () {
    const total = expenses.reduce((current, next) => {
      if (!next.credited) {
        return current;
      } else return (current += next.creditValue);
    }, 0);
    return total;
  };

  return (
    <div className="expenseContainer">
      {showForm === false ? (
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "2em" }}>Expense List: </p>
          <select
            className="expense-filter-list"
            onChange={(e) => {
              setCategory(e.target.value);
              filterExpenseCat(e.target.value);
            }}
          >
            <option value="none">No Filter</option>
            <option value="purchase">Purchases</option>
            <option value="insurance">Insurance</option>
            <option value="tax">Tax</option>
            <option value="fuel">Fuel</option>
            <option value="servicing">Servicing</option>
            <option value="MOT">MOT</option>
            <option value="parts">Parts</option>
            <option value="cleaning">Cleaning</option>
            <option value="accessories">Accessories</option>
            <option value="storage">Storage</option>
            <option value="garage work">Garage work</option>
          </select>
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
          expenses={expenses}
        ></NewExpenseForm>
      )}
      <div className="ExpenseList">
        <div className="expenseListItem headings" style={{ paddingBlock: "1em", borderBottom: " solid white 1px" }}>
          <p style={{ width: "8%" }}>Date</p>
          <p style={{ width: "8%" }}>Vehicle</p>
          <p style={{ width: "8%" }}>Category</p>
          <p style={{ width: "24%" }}>Description</p>
          <p style={{ width: "8%" }}>Value</p>
          <p style={{ width: "6%" }}>Credited?</p>
          <p style={{ width: "8%" }}>Credit Value</p>
          <p style={{ width: "8%" }}>Outstanding</p>
          <p style={{ width: "8%" }}>Options</p>
        </div>
        <div className="pre-expense-list">
          <p className="pre-total expenses-sum">£{getExpenseTotal()}</p>
          <p className="pre-total credit-value">£{getCreditTotal()}</p>
          <p className="pre-total outstanding">£{getOutstandingTotal()}</p>
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
        </div>
        {expenses.map((e) => {
          return (
            <ExpenseListItem
              e={e}
              key={e._id}
              deleteExpenseHandler={deleteExpenseHandler}
              expenseVehicleFinder={getExpenseVehicle}
            ></ExpenseListItem>
          );
        })}
      </div>
    </div>
  );
};

export default Expenses;
