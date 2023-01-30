const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  vehicleId: { type: String, required: true },
  expenseId: { type: String },
  serviceType: { type: String, Enum: ["basic", "minor", "major", "full service"] },
  serviceDate: { type: Date },
  mileageAtService: { type: Number },
  serviceEnvironment: { type: String, Enum: ["home", "garage", "dealer"] },
});

const Service = new mongoose.model("service", schema);

module.exports = Service;
