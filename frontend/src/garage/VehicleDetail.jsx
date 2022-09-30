import React from "react";
import { useParams } from "react-router-dom";

const CarDetail = (props) => {
  const params = useParams();

  return (
    <>
      <h1>car detail page</h1>
      <p>{params.vehicleId}</p>
    </>
  );
};

export default CarDetail;
