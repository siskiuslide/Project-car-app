import Dashboard from "./dashboard/Dashboard";
import Garage from "./garage/Garage";
import CarDetail from "./garage/VehicleDetail";
import Expenses from "./expenses/Expenses";
import Journal from "./journal/Journal";
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AddVehicleForm from "./garage/AddVehicleForm";
import vehicleData from "./data";

export function App() {
  const [garage, setGarage] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [todo, setTodo] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const setRefreshHandler = function () {
    console.log("refreshing");
    setRefresh(true);
  };

  useEffect(() => {
    if (refresh === true) {
      const garage = fetch("http://localhost:4000/garage")
        .then((res) => res.json())
        .then((data) => {
          setGarage(data.data);
          return data;
        })
        .catch((err) => console.log(err));

      const expenses = fetch("http://localhost:4000/expenses")
        .then((res) => res.json())
        .then((data) => {
          setExpenses(data.data);
          return data;
        })
        .catch((err) => console.log(err));

      const todos = fetch("http://localhost:4000/todo")
        .then((res) => res.json())
        .then((data) => {
          setTodo(data.todos);
          return data;
        })
        .catch((err) => console.log(err));

      setRefresh(false);
    }
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/dashboard"></Redirect>
        </Route>
        <Route path="/dashboard">
          <Dashboard
            garage={garage}
            loading={isLoading}
            expenses={expenses}
            todo={todo}
            setRefreshHandler={setRefreshHandler}
          />
        </Route>
        <Route path="/garage" exact>
          <Garage
            garage={garage}
            loading={isLoading}
            expenses={expenses}
            vehicleData={vehicleData}
            setRefreshHandler={setRefreshHandler}
          />
        </Route>
        <Route path="/garage/add-vehicle" exact>
          <AddVehicleForm
            garage={garage}
            vehicleData={vehicleData.sort((a, b) => {
              a.brand.localeCompare(b.brand);
            })}
            setRefreshHandler={setRefreshHandler}
          ></AddVehicleForm>
        </Route>
        <Route path="/garage/:vehicleId" exact>
          <CarDetail setRefreshHandler={setRefreshHandler}></CarDetail>
        </Route>

        <Route path="/expenses">
          <Expenses garage={garage} expenses={expenses} setRefreshHandler={setRefreshHandler} />
        </Route>
        <Route path="/journal">
          <Journal todo={todo} setRefreshHandler={setRefreshHandler}></Journal>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
