import Dashboard from "./dashboard/Dashboard";
import Garage from "./garage/Garage";
import CarDetail from "./garage/VehicleDetail";
import Expenses from "./expenses/Expenses";
import Journal from "./journal/Journal";
import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./Components/Navbar";

import "./App.css";
import AddVehicleForm from "./garage/AddVehicleForm";

function App() {
  const [garage, setGarage] = useState([]);
  const [isLoading, setLoading] = useState([false]);

  useEffect(() => {
    const garage = fetch("http://localhost:4000/garage")
      .then((res) => res.json())
      .then((data) => {
        setGarage(data.data);
        return data;
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);
  return (
    <div className="Background">
      <Navbar></Navbar>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/dashboard"></Redirect>
        </Route>
        <Route path="/dashboard">
          <Dashboard garage={garage} loading={isLoading} />
        </Route>
        <Route path="/garage" exact>
          <Garage garage={garage} loading={isLoading} />
        </Route>
        <Route path="/garage/add-vehicle" exact>
          <AddVehicleForm></AddVehicleForm>
        </Route>
        <Route path="/garage/:vehicleId" exact>
          <CarDetail></CarDetail>
        </Route>

        <Route path="/expenses">
          <Expenses />
        </Route>
        <Route path="/journal">
          <Journal></Journal>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
