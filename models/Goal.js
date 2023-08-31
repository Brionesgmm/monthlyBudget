const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  goals: [
    {
      goal: {
        type: String,
        required: true,
      },
      goalValue: {
        type: Number,
        required: true,
      },
      accomplished: { type: Boolean, default: false },
      id: String,
      _id: false,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Goal", GoalSchema);
