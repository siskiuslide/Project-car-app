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
export const dailyMileage = function (vehicle) {
  const drivenMileage = getDrivenMileage(vehicle);
  const days = getTenure(vehicle);
  const perDay = drivenMileage / days;
  return perDay;
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

export const getVehicleExpenses = function (vehicle, expenses) {
  const vehicleExpenses = expenses.filter((e) => {
    return e.vehicleId === vehicle._id;
  });
  const total = vehicleExpenses.reduce((current, next) => {
    return (current += next.value);
  }, 0);
  return total;
};

export const getCreditedExpenses = function (vehicle, expenses) {
  if (vehicle) {
    return expenses
      .filter((e) => {
        return e.vehicleId === vehicle._id;
      })
      .reduce((current, i) => {
        if (!i.credited) {
          return current;
        }
        return (current += i.creditValue);
      }, 0);
  }

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

export const getNetProfit = function (vehicle, totalExpenses, expenseList) {
  const credit = getCreditedExpenses(vehicle, expenseList);
  const netProfit = credit - (vehicle.boughtFor + totalExpenses);

  return netProfit.toFixed(2);
};

export const getCostPerDay = function (vehicle, expenses) {
  const credit = getCreditedExpenses(vehicle, expenses);
  const totalExpenses = getVehicleExpenses(vehicle, expenses);
  let totalExpenditure = totalExpenses - credit;
  const days = getTenure(vehicle);
  return (totalExpenditure / days).toFixed(2);
};

export const getCostPerMile = function (vehicle, expenses) {
  const vehicleExpenses = getVehicleExpenses(vehicle, expenses);
  const credit = getCreditedExpenses(vehicle, expenses);
  const mileage = getDrivenMileage(vehicle);
  let totalExpenditure = vehicleExpenses - credit;

  let costPerMile = totalExpenditure / mileage;

  return costPerMile.toFixed(2);
};

export const getCostPerMileFuel = function (vehicle, expenses) {
  const fuelExpenses = expenses.reduce((current, next) => {
    if (next.category === "fuel" && next.tripSinceLastFill) {
      return (current += next.value);
    } else return current;
  }, 0);

  const mileageBetweenFillups = expenses.reduce((current, next) => {
    if (next.tripSinceLastFill) {
      return (current += next.tripSinceLastFill);
    } else return current;
  }, 0);
  return (fuelExpenses / mileageBetweenFillups).toFixed(2);
};

export const getNextServiceDate = function (vehicle) {
  if (!vehicle.lastServiceDate) {
    return null;
  }
  const monthInterval = vehicle.serviceIntervalTimeMonths;
  const lastServiceDate = new Date(vehicle.lastServiceDate);
  const months = lastServiceDate.getMonth();

  const nextServiceDate = lastServiceDate.setMonth(months + monthInterval);
  return nextServiceDate;
};

export const getNextServiceMileage = function (vehicle) {
  if (!vehicle.lastServiceMileage) {
    return null;
  }
  return vehicle.lastServiceMileage + vehicle.serviceIntervalMileage;
};

export const getMileageUntilService = function (vehicle) {
  const nextService = getNextServiceMileage(vehicle);
  const currentMileage = vehicle.currentMileage;
  return nextService - currentMileage;
};

export const getEstimatedServiceDate = function (vehicle) {
  if (!vehicle.lastServiceMileage) {
    return null;
  }
  const weeklyMileage = getEstimatedUsage(vehicle);
  const mileageUntilNext = getMileageUntilService(vehicle);
  const weeks = mileageUntilNext / weeklyMileage;
  const days = weeks * 7;
  const now = new Date(Date.now());
  const currentDate = now.getDate();
  const estimated = now.setDate(currentDate + days);
  return estimated;
};

export const getAverageTrip = function (expenses) {
  const filtered = expenses.filter((el) => el.tripSinceLastFill);
  const total = filtered.reduce((current, next) => {
    return current + next.tripSinceLastFill;
  }, 0);
  const average = total / filtered.length;
  return average.toFixed(1);
};
