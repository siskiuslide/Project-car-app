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
    purchaseDate: { type: Date, required: true },
    buyMileage: { type: Number },
    currentMileage: { type: Number },
    drivenMileage: { type: Number },
    estimatedMileage: { type: Number },
    units: { type: String, Enum: ["mi", "km"] },
    sold: { type: Boolean, default: false },
    soldFor: { type: Number },
    soldDate: { type: Date },
    tenure: { type: Number },
  },
  { timestamps: true }
);

schema.pre("save", function (next) {
  if (this.currentMileage) {
    this.drivenMileage = this.currentMileage - this.buyMileage;
  }
  const startDate = new Date(this.purchaseDate);
  const tenureDate = this.soldDate ?? Date.now;
  this.tenure = parseInt(Date.now() - startDate) / (1000 * 60 * 60 * 24);

  next();
});

schema.pre("findOneAndUpdate", function (next) {
  if (this._update.currentMileage) {
    console.log("-------------------------------------");
    this.drivenMileage = this.currentMileage - this.buyMileage;
  }
  next();
});
const Vehicle = new mongoose.model("vehicle", schema);

module.exports = Vehicle;
