const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    variant: { type: String, required: true },
    year: { type: Number, required: true },
    cc: { type: Number, required: true },
    purpose: { type: String, required: true },
  },
  { timestamps: true }
);
const Vehicle = new mongoose.Model("vehicle", schema);

module.exports = Vehicle;
