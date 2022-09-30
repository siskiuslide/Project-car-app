import React from "react";
import "./TotalCosts.css";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const TotalCosts = (props) => {
  return (
    <Link className="TotalCosts GridItem" to={props.link}>
      <p className="GridItemText">Total Costs:</p>
      <p
        className="EnlargedFigure"
        style={{
          textDecoration: "underline",
          textDecorationColor: "red",
          textDecorationThickness: "1px",
          textUnderlinePosition: "under",
        }}
      >
        £6734.45
      </p>
    </Link>
  );
};

export default TotalCosts;
