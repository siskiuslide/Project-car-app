const catchAsync = require("../helpers/catchAsync");
const Vehicle = require("../models/vehicleModel");
const Expense = require("../models/expenseModel");

exports.getVehicles = catchAsync(async function (req, res, next) {
  const vehicles = await Vehicle.find({});
  return res.status(200).json({ status: "success", data: vehicles });
});

exports.getSingleVehicle = catchAsync(async function (req, res, next) {
  const vehicle = await Vehicle.find({ id: req.params.id });
  return res.status(200).json({ status: "success", data: vehicle });
});

exports.addVehicle = catchAsync(async function (req, res, next) {
  const vehicle = await Vehicle.create({
    ...req.body,
  });
  const expense = await Expense.create({
    vehicleId: vehicle.id,
    date: req.body.date,
    category: "purchase",
    value: req.body.boughtFor,
    description: `${req.body.manufacturer} - ${req.body.reg.toUpperCase()}`,
  }).then(console.log("expense created"));
  return res.status(200).json({ status: "success", data: vehicle });
});

exports.sellVehicle = catchAsync(async function (req, res, next) {
  const sold = await Vehicle.findOneAndUpdate(
    { _id: req.body.vehicleId },
    { sold: req.body.sold, soldFor: req.body.soldFor, soldDate: req.body.soldDate, currentMileage: req.body?.mileage }
  ).then(console.log("Vehicle sale history updated"));
  return res.status(200).json({ status: "Success", data: sold });
});

exports.reclaimVehicle = catchAsync(async function (req, res, next) {
  const reclaimed = await Vehicle.findOneAndUpdate({ id: req.body.vehicleId }, { ...req.body });
  return res.status(200).json({ status: "success", data: reclaimed });
});

exports.updateVehicle = catchAsync(async function (req, res, next) {
  // const updated = await Vehicle.findOneAndUpdate({ _id: req.body.vehicleId }, { ...req.body });
  const updated = await Vehicle.findOneAndUpdate({ _id: req.body.vehicleId }, { ...req.body });
  return res.status(200).json({ status: "success", data: updated });
});

exports.deleteVehicle = catchAsync(async function (req, res, next) {
  const deleted = await Vehicle.deleteOne({ id: req.body.id }); //delete from vehicle database
  //we should then delete/archive associated expenses and to-do items

  return res.status(200).json({ status: "success", data: deleted });
});
