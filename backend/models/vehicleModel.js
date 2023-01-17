const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    type: { type: String, enum: ["car", "motorcycle", "van"] },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    variant: { type: String },
    year: { type: Number, required: true },
    cc: { type: Number },
    reg: { type: String, required: true, unique: true },
    purpose: {
      type: String,
      required: true,
      enum: ["daily", "weekend", "summer", "track", "show", "project", "drift", "resale"],
    },
    owner: { type: String },
    boughtFor: { type: Number },
    purchaseDate: { type: Date },
    buyMileage: { type: Number },
    currentMileage: { type: Number },
    sold: { type: Boolean, default: false },
    soldFor: { type: Number },
    soldDate: { type: Date },
  },
  { timestamps: true }
);
const Vehicle = new mongoose.model("vehicle", schema);

module.exports = Vehicle;
