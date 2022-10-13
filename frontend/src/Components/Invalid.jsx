import React from "react";

const Invalid = (props) => {
  return (
    <p style={{ color: "red", textAlign: "right" }}>
      {!props.formValid && `${props.invalidText ?? "Invalid submission"}`}
    </p>
  );
};

export default Invalid;
