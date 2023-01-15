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
        "other",
      ],
    },
    value: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Expense = new mongoose.model("Expense", schema);
module.exports = Expense;
