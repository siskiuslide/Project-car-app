export const getTenure = function (vehicle) {
  if (!vehicle.purchaseDate) {
    return "N/A";
  }
  let date1 = new Date(vehicle.sellDate);
  let date2 = new Date(vehicle.purchaseDate);
  if (!vehicle.sellDate) {
    date1 = Date.now();
  }
  const difference = parseInt(date1 - date2);
  const days = difference / (1000 * 60 * 60 * 24);

  return days.toFixed(0);
};

export const getVehicleAge = function (year) {
  const current = new Date().getFullYear();
  const age = parseInt(current - year);
  return age;
};

export const getDrivenMileage = function (vehicle) {
  if (!vehicle.currentMileage) {
    return "unknown";
  }
  const drivenMileage = vehicle.currentMileage - vehicle.buyMileage;
  return drivenMileage;
};
export const getMileagePerYear = function (vehicle) {
  if (!vehicle.currentMileage || !vehicle.buyMileage) {
    return "N/A";
  }

  const age = getVehicleAge(vehicle.year);
  if (!vehicle.currentMileage) {
    return vehicle.buyMileage / age;
  }
  if (!vehicle.buyMileage) {
    return "Unknown";
  } else return (vehicle.currentMileage / age).toFixed(0);
};

export const getEstimatedUsage = function (vehicle) {
  const drivenMileage = getDrivenMileage(vehicle);
  const days = getTenure(vehicle);
  const weeks = days / 7;
  const perWeek = drivenMileage / weeks;
  return perWeek;
};
export const getEstimatedMPG = function (expenses) {
  const clone = structuredClone(expenses);
  const filtered = clone.filter((i) => i.category === "fuel" && i.tripSinceLastFill);
  if (filtered.length < 1) {
    return;
  }

  const value = filtered.reduce((current, i) => {
    return (current += i.value);
  }, 0);
  const totalMileage = filtered.reduce((current, i) => {
    return (current += i.tripSinceLastFill);
  }, 0);

  const fuelQuantity = filtered.reduce((current, i) => {
    return current + i.litres;
  }, 0);

  const gallons = fuelQuantity / 4.546;
  const mpg = (totalMileage / gallons).toFixed(2);

  return mpg;
};

export const getTotalExpenses = function (expenses) {
  const vehicleExpenses = expenses
    .filter((e) => e.category !== "purchase")
    .reduce((current, i) => {
      return (current += i.value);
    }, 0);
  return vehicleExpenses;
};

export const getCreditedExpenses = function (expenses) {
  const credited = expenses.reduce((current, i) => {
    if (!i.credited) {
      return current;
    }
    return (current += i.creditValue);
  }, 0);
  return credited;
};

export const getGrossProfit = function (vehicle) {
  return (vehicle.soldFor - vehicle.boughtFor).toFixed(2);
};

export const getNetProfit = function (vehicle, expenses) {
  const netProfit = vehicle.soldFor - (vehicle.boughtFor + expenses);
  return netProfit.toFixed(2);
};

export const getCostPerDay = function (vehicle, expenses) {
  const credit = getCreditedExpenses(expenses);
  const totalExpenses = getTotalExpenses(expenses);
  let totalExpenditure = vehicle.boughtFor + totalExpenses;
  if (vehicle.soldFor) {
    totalExpenditure = vehicle.boughtFor + totalExpenses - vehicle.soldFor;
  }
  const days = getTenure(vehicle);
  return ((totalExpenditure - credit) / days).toFixed(2);
};