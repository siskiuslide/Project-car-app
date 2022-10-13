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
  const [isLoading, setLoading] = useState([false]);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/dashboard"></Redirect>
        </Route>
        <Route path="/dashboard">
          <Dashboard garage={garage} loading={isLoading} expenses={expenses} />
        </Route>
        <Route path="/garage" exact>
          <Garage garage={garage} loading={isLoading} expenses={expenses} vehicleData={vehicleData} />
        </Route>
        <Route path="/garage/add-vehicle" exact>
          <AddVehicleForm
            garage={garage}
            vehicleData={vehicleData.sort((a, b) => {
              a.brand.localeCompare(b.brand);
            })}
          ></AddVehicleForm>
        </Route>
        <Route path="/garage/:vehicleId" exact>
          <CarDetail></CarDetail>
        </Route>

        <Route path="/expenses">
          <Expenses garage={garage} expenses={expenses} />
        </Route>
        <Route path="/journal">
          <Journal></Journal>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
