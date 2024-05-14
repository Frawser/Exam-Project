const express = require("express");
const router = express.Router();
const LoggedWorkout = require("../models/loggedworkout");

// POST route to log a workout
router.post("/log", async (req, res) => {
  try {
    const { userId, exerciseId, sets } = req.body;

    // Create a new logged workout instance
    const loggedWorkout = new LoggedWorkout({
      userId,
      exercise: exerciseId,
      sets,
    });

    // Save the logged workout to the database
    const savedWorkout = await loggedWorkout.save();

    res.status(201).json(savedWorkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to get logged workouts for a specific user and exercise
router.get("/logs", async (req, res) => {
  try {
    const { userId, exerciseId } = req.query;

    // If exerciseId is not provided, return a message to log the first workout
    if (!exerciseId) {
      return res
        .status(400)
        .json({ message: "Please select an exercise to log your workouts." });
    }

    const workouts = await LoggedWorkout.find({ userId, exercise: exerciseId });

    if (workouts.length === 0) {
      return res.json({
        message:
          "You haven't logged any workouts for this exercise yet. Start by logging your first workout!",
      });
    }

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
