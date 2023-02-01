const catchAsync = require("../helpers/catchAsync");
const Service = require("../models/serviceModel");

exports.getVehicleServiceRecords = catchAsync(async function (req, res, next) {
  const records = await Service.find({ vehicleId: req.params.vehicleId });
  return res.status(200).json({ status: "success", data: records });
});

exports.addServiceRecord = catchAsync(async function (req, res, next) {
  const record = await Service.create({ ...req.body });
  const records = await Service.find();
  return res.status(200).json({ status: "success", data: records });
});

exports.deleteServiceRecord = catchAsync(async function (req, res, next) {});
