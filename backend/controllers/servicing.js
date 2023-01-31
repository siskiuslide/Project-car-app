const catchAsync = require("../helpers/catchAsync");
const Service = require("../models/serviceModel");

exports.getVehicleServiceRecords = catchAsync(async function (req, res, next) {
  const records = await Service.find({ vehicleId: req.params.vehicleId });
  return res.status(200).json({ status: "success", data: records });
});

exports.addServiceRecord = catchAsync(async function (req, res, next) {
  const record = await Service.create({ ...req.body });
  return res.status(200).json({ status: "success", data: record });
});

exports.deleteServiceRecord = catchAsync(async function (req, res, next) {});
