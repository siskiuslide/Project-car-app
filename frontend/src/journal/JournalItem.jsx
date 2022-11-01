import React from "react";

const JournalItem = (props) => {
  return (
    <>
      <p>{props.item.createdAt}</p>
      <p>{props.item.category}</p>
      <p>{props.item.description}</p>
      <p>{props.item.completed}</p>
    </>
  );
};
export default JournalItem;
