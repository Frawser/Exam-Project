const mongoose = require("mongoose");

const personalRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exercise: {
    type: String,
    enum: ["deadlift", "benchPress", "squat"],
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PersonalRecord = mongoose.model("PersonalRecord", personalRecordSchema);

module.exports = PersonalRecord;
