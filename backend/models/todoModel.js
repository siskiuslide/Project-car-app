const mongoose = require("mongoose");

const todo = new mongoose.Schema(
  {
    vehicle: { type: String },
    category: { type: String, enum: ["work"] },
    description: { type: String },
  },
  { timestamps: true }
);

const Todo = new mongoose.model("todo", todo);

module.exports = Todo;
