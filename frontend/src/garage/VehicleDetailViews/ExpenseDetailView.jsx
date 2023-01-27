import React from "react";
import "../../expenses/Expenses.css";
import "./ExpenseDetailView.css";

const ExpenseDetailView = (props) => {
  return (
    <>
      <div className="expense-list-heading">
        <p className="expense-date heading">Date</p>
        <p className="vehicle-reg heading">Reg</p>
        <p className={`expense-category heading`}>Category</p>
        <p className="expense-description heading">Description</p>
        <p className="expense-value heading">Value</p>
        <p className="expense-credited heading">Credited?</p>

        <p className="expense-credit-value heading" style={{ width: "5%" }}>
          Credit Amount
        </p>
        <p className="expense-outstanding heading">Remaining</p>
      </div>

      {props.expenses.map((e) => {
        return (
          <>
            <div className="expenseListItem">
              <p className="expense-date">{e.date}</p>
              <p className="vehicle-reg" style={{ textTransform: "uppercase" }}>
                {props.vehicle.reg}
              </p>
              <p className={`expense-category category-${e.category}`}>{e.category}</p>
              <p className="expense-description">{e.description}</p>
              <p className="expense-value">£{e.value}</p>
              <p className="expense-credited">{e.credited && "true"}</p>
              {e.credited && (
                <>
                  <p className="expense-credit-value">£{e.creditValue}</p>
                  <p className="expense-outstanding">£{(e.value - e.creditValue).toFixed(2)}</p>
                </>
              )}
            </div>
          </>
        );
      })}
    </>
  );
};

export default ExpenseDetailView;
