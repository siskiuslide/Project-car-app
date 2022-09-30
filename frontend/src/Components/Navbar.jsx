import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink activeClassName="activeNav" to="/dashboard" className="nav-item-text">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="activeNav" to="/garage" className="nav-item-text">
            Garage
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="activeNav" to="/journal" className="nav-item-text">
            To-do
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="activeNav" to="/expenses" className="nav-item-text">
            Expenses
          </NavLink>
        </li>
      </ul>
      <ul className="login-section">
        <li>
          <NavLink activeClassName="activeNav" to="account" className="nav-item-text material-icons">
            account_circle
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
