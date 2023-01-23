const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    vehicleId: { type: String },
    date: { type: String },
    category: {
      type: String,
      required: true,
      enum: [
        "purchase",
        "insurance",
        "tax",
        "fuel",
        "servicing",
        "parts",
        "cleaning",
        "modification",
        "accessories",
        "MOT",
        "storage",
        "garage work",
        "toll",
        "admin",
        "other",
      ],
    },
    value: { type: Number, required: true },
    description: { type: String },
    pencePerLitre: { type: Number },
    tripSinceLastFill: { type: Number },
    litres: { type: Number },
  },
  { timestamps: true }
);

schema.pre("save", function (next) {
  if (this.category === "fuel") {
    this.litres = (this.value * 100) / this.pencePerLitre;
  }
  next();
});

const Expense = new mongoose.model("Expense", schema);
module.exports = Expense;
