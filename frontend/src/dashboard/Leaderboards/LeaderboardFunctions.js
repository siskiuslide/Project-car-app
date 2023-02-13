import { getCostPerDay, getEstimatedMPG, getTenure, convertKMtoMi } from "../../Functions";

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
    let mileageDriven = v?.currentMileage - v?.buyMileage;
    if (v.units === "km") {
      mileageDriven = convertKMtoMi(v?.currentMileage - v?.buyMileage).toFixed();
    }
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

export const getAverageMPG = function (garage, expenses) {
  const mpgList = [];
  garage.forEach((v) => {
    const vehicleExpenses = expenses.filter((i) => {
      return i.vehicleId === v._id;
    });
    let mpg = getEstimatedMPG(vehicleExpenses);
    if (v.units === "km") {
      mpg = convertKMtoMi(getEstimatedMPG(vehicleExpenses)).toFixed(2);
    }
    if (!mpg) {
      return;
    }
    const mpgObject = {
      vehicleId: v._id,
      manufacturer: v.manufacturer,
      model: v.model,
      reg: v.reg,
      mpg,
    };
    return mpgList.push(mpgObject);
  });
  return mpgList;
};

export const getCostPerDayL = function (garage, expenses) {
  const costList = [];
  garage.forEach((v) => {
    const costPerDay = getCostPerDay(v, expenses);
    const tenure = getTenure(v);
    const costObject = {
      vehicleId: v._id,
      manufacturer: v.manufacturer,
      model: v.model,
      reg: v.reg,
      tenure,
      costPerDay,
      units: v.units == "mi" ? "m" : "km",
    };
    return costList.push(costObject);
  });
  return costList;
};

export const getExpenseCategoryTotals = function (expenses) {
  const categories = [
    "purchase",
    "insurance",
    "tax",
    "fuel",
    "servicing",
    "parts",
    "cleaning",
    "modification",
    "accessories",
    "MOT",
    "storage",
    "garage work",
    "toll",
    "admin",
    "other",
  ];

  const categoriesFiltered = [];
  categories.forEach((category) => {
    const filtered = expenses.filter((e) => e.category === category);
    const total = filtered.reduce((current, next) => {
      return (current += next.value);
    }, 0);
    const categoryObj = { category, total };
    return categoriesFiltered.push(categoryObj);
  });
  return categoriesFiltered;
};

export const getMostExpensive = function (expenses) {
  const sorted = expenses.sort((a, b) => {
    return b.value - a.value;
  });
  return sorted;
};
