const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    type: { type: String, enum: ["car", "motorcycle", "van"], required: true },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    variant: { type: String, required: true },
    year: { type: Number, required: true },
    cc: { type: Number, required: true },
    reg: { type: String, required: true },
    purpose: {
      type: String,
      required: true,
      enum: ["daily", "weekend", "summer", "track", "show", "project", "drift", "resale"],
    },
    boughtFor: { type: Number },
  },
  { timestamps: true }
);
const Vehicle = new mongoose.model("vehicle", schema);

module.exports = Vehicle;
