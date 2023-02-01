import React from "react";
import Plot from "react-plotly.js";
import { useState, useEffect } from "react";

const ServiceHistoryPlot = (props) => {
  const [serviceHistory, setServiceHistory] = useState();
  const [currentYear, setCurrentYear] = useState(new Date(Date.now()).getFullYear());

  const getServiceHistory = async function () {
    const req = await fetch(`http://127.0.0.1:4000/service/${props.vehicle._id}`);
    const json = await req.json();
    const data = json.data;
    const sorted = data.sort((a, b) => {
      return a.mileageAtService - b.mileageAtService;
    });
    return sorted;
  };

  useEffect(() => {
    getServiceHistory().then((data) => setServiceHistory(data));
  }, []);

  const getYearsXAxis = function (context, serviceHistory) {
    const xaxisService = [];
    const xaxisOther = [];
    serviceHistory?.forEach((r) => {
      if (
        r.serviceType === "basic" ||
        r.serviceType === "minor" ||
        r.serviceType === "major" ||
        r.serviceType === "full service"
      )
        return xaxisService.push(r.serviceDate);
      else return xaxisOther.push(r.serviceDate);
    });
    return context === "service" ? xaxisService : xaxisOther;
  };

  const getYAxis = function (context, serviceHistory) {
    const mileagesService = [];
    const mileagesOther = [];

    serviceHistory?.forEach((r) => {
      if (
        r.serviceType === "basic" ||
        r.serviceType === "minor" ||
        r.serviceType === "major" ||
        r.serviceType === "full service"
      ) {
        return mileagesService.push(r.mileageAtService);
      } else {
        return mileagesOther.push(r.mileageAtService);
      }
    });
    return context === "service" ? mileagesService : mileagesOther;
  };

  const data = [
    {
      x: getYearsXAxis("service", serviceHistory),
      y: getYAxis("service", serviceHistory),
      type: "scatter",
      mode: "lines + markers",
      marker: { color: "rgb(51, 153, 194)" },
      name: "Engine Services",
    },
    {
      type: "scatter",
      mode: "markers",
      marker: {
        size: 100,
      },
      x: getYearsXAxis("other", serviceHistory),
      y: getYAxis("other", serviceHistory),
      name: "Other Service Items",
      marker: { color: "limegreen" },
    },
  ];

  const layout = {
    plot_bgcolor: "rgba(58, 57, 57, 0.34)",
    paper_bgcolor: "transparent",
    font: { size: 12, color: "white" },
    width: 1050,
    height: 600,
    title: "Service History",
    xaxis: { title: "Time" },
    yaxis: { title: "Mileage" },
  };

  return <Plot data={data} layout={layout}></Plot>;
};
export default ServiceHistoryPlot;
