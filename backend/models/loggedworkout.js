// loggedworkout.js (Mongoose model)
const mongoose = require("mongoose");

const SetSchema = new mongoose.Schema({
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

const LoggedWorkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exercise: {
    type: String,
    required: true,
  },
  sets: {
    type: [SetSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LoggedWorkout = mongoose.model("LoggedWorkout", LoggedWorkoutSchema);

module.exports = LoggedWorkout;
