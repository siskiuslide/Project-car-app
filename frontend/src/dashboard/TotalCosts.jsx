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

  const runningCosts = props.expenses
    .filter(
      (i) => i.category === "fuel" || i.category === "servicing" || i.category === "tax" || i.category === "insurance"
    )
    .map((i) => {
      return i.value;
    });

  const misc = props.expenses
    .filter((i) => {
      return (
        i.category === "parts" ||
        i.category === "cleaning" ||
        i.category === "accessories" ||
        i.category === "modification"
      );
    })
    .map((i) => i.value);

  return (
    <Link className="TotalCosts GridItem " to={props.link}>
      <p className="GridItemText ">Total Costs:</p>
      <p
        className="EnlargedFigure"
        style={{
          textDecoration: "underline",
          textDecorationColor: "red",
          textDecorationThickness: "1px",
          textUnderlinePosition: "under",
        }}
      >
        £{total.toFixed(2)}
      </p>
      <div className="moreInfoList">
        <div className="moreInfoFlex">
          <p>Purchases:</p>
          <p>
            £
            {purchases
              .reduce((current, next) => {
                return (current += next);
              }, 0)
              .toFixed(2)}
          </p>
        </div>
        <div className="moreInfoFlex">
          <p>Running Costs:</p>
          <p>
            £
            {runningCosts
              .reduce((current, next) => {
                return (current += next);
              }, 0)
              .toFixed(2)}
          </p>
        </div>
        <div className="moreInfoFlex">
          <p>Misc:</p>
          <p>
            £
            {misc
              .reduce((current, next) => {
                return (current += next);
              }, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TotalCosts;
