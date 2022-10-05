import React from "react";
import "./TotalCosts.css";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const TotalCosts = (props) => {
  const total = props.expenses.reduce((current, i) => {
    return (current += i.value);
  }, 0);
  const purchases = props.expenses.map((i) => {
    return i.category === "purchase" && i.value;
  });
  console.log(purchases);
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
        £{total}
      </p>
      <div className="moreInfoList">
        <div className="moreInfoFlex">
          <p>Purchases:</p>
          <p>
            £
            {purchases.reduce((current, next) => {
              return (current += next);
            }, 0)}
          </p>
        </div>
        <div className="moreInfoFlex">
          <p>Running Costs:</p>
          <p>£0</p>
        </div>
        <div className="moreInfoFlex">
          <p>Misc:</p>
          <p>£0</p>
        </div>
      </div>
    </Link>
  );
};

export default TotalCosts;
