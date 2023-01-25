import { getTenure } from "../../Functions";

export const getTenureList = function (garage) {
  const tenureList = [];
  garage.forEach((v) => {
    const tenure = getTenure(v);
    const tenureVehicle = {
      manufacturer: v.manufacturer,
      model: v.model,
      reg: v.reg,
      id: v._id,
      tenure: tenure,
    };
    return tenureList.push(tenureVehicle);
  });

  return tenureList;
};

export const getOverallCost = function (garage, expenses) {
  const costList = [];
  garage.forEach((v) => {
    const vehicleId = v._id;
    const expenseForVehicle = expenses.filter((e) => {
      return e.vehicleId === vehicleId;
    });
    const totalCost = expenseForVehicle.reduce((current, next) => {
      return (current += next.value - next.creditValue);
    }, 0);
    const vehicleCost = { vehicleId, manufacturer: v.manufacturer, model: v.model, reg: v.reg, totalCost };
    costList.push(vehicleCost);
  });
  return costList;
};

export const getMileageDriven = function (garage) {
  const mileageList = [];
  garage.forEach((v) => {
    if (!v.currentMileage) {
      return;
    }
    const mileageDriven = v?.currentMileage - v?.buyMileage;
    const mileageObject = {
      vehicleId: v._id,
      manufacturer: v.manufacturer,
      model: v.model,
      reg: v.reg,
      mileageDriven,
      units: v.units,
    };
    mileageList.push(mileageObject);
  });
  return mileageList;
};
