const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    type: { type: String, enum: ["car", "motorcycle", "van"], required: true },
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
    boughtFor: { type: Number },
    purchaseDate: { type: Date },
    sold: { type: Boolean, default: false },
    soldFor: { type: Number },
    soldDate: { type: Date },
  },
  { timestamps: true }
);
const Vehicle = new mongoose.model("vehicle", schema);

module.exports = Vehicle;
