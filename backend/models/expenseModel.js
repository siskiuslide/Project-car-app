const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  vehicleId: { type: String },
  date: { type: String },
  category: {
    type: String,
    required: true,
    enum: ["purchase", "insurance", "tax", "fuel", "servicing", "parts", "cleaning", "modification", "accessories"],
  },
  value: { type: Number, required: true },
});

const Expense = new mongoose.model("Expense", schema);
module.exports = Expense;
