const catchAsync = require("../helpers/catchAsync");
const Vehicle = require("../models/vehicleModel");

exports.getVehicles = catchAsync(async function (req, res, next) {
  const vehicles = await Vehicle.find({});
  console.log(vehicles);
  return res.status(200).json({ status: "success", data: vehicles });
});

exports.addVehicle = catchAsync(async function (req, res, next) {
  console.log(req.body);
  const vehicle = await Vehicle.create({
    type: req.body.type,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    variant: req.body.variant,
    year: req.body.year,
    cc: req.body.cc,
    purpose: req.body.purpose,
    boughtFor: req.body.boughtFor,
  });
  return res.status(200).json({ status: "success", data: vehicle });
});
