const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    variant: { type: String, required: true },
    year: { type: Number, required: true },
    cc: { type: Number, required: true },
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
