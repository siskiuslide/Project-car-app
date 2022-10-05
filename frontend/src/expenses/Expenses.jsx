import React from "react";
import "./Expenses.css";
import "../App.css";
import "../GeneralCSS/forms.css";
import { useState } from "react";
import Button from "../Components/Button";
import NewExpenseForm from "./NewExpenseForm";

const Expenses = (props) => {
  return <NewExpenseForm garage={props.garage}></NewExpenseForm>;
};

export default Expenses;
