const catchAsync = require("../helpers/catchAsync");
const Vehicle = require("../models/vehicleModel");

exports.getVehicles = catchAsync(async function (req, res, next) {
  return res.status(200).json({ status: "success", data: "lol" });
});

exports.addVehicle = catchAsync(async function (req, res, next) {
  const vehicle = await Vehicle.create({
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    variant: req.body.variant,
    year: req.body.year,
    cc: req.body.cc,
    purpose: req.body.purpose,
  });
  return res.status(200).json({ status: "success", data: vehicle });
});
