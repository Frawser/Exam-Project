const express = require('express');
const PersonalRecord = require('../models/personalRecords');

const router = express.Router();

// Add personal record
router.post('/', async (req, res) => {
  const { userId, exercise, value: personalBest } = req.body;

  try {
    if (!userId || !exercise || !personalBest) {
      return res.status(400).json({ message: 'userId, exercise, and value are required' });
    }

    const newPersonalRecord = new PersonalRecord({ userId, exercise, value: personalBest });
    await newPersonalRecord.save();
    res.status(201).json({ message: 'Personal record added successfully', personalRecord: newPersonalRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get personal records for a user
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const personalRecords = await PersonalRecord.find({ userId }).sort({ createdAt: -1 });
    res.json(personalRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get latest personal record for deadlift for a user
router.get('/latest/deadlift/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const latestDeadlift = await PersonalRecord.findOne({ exercise: 'deadlift', userId }).sort({ createdAt: -1 });
    res.json(latestDeadlift);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get latest personal record for benchpress for a user
router.get('/latest/benchpress/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const latestBenchpress = await PersonalRecord.findOne({ exercise: 'benchPress', userId }).sort({ createdAt: -1 });
    res.json(latestBenchpress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get latest personal record for squat for a user
router.get('/latest/squat/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const latestSquat = await PersonalRecord.findOne({ exercise: 'squat', userId }).sort({ createdAt: -1 });
    res.json(latestSquat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get first personal record for deadlift for a user
router.get('/first/deadlift/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const firstDeadlift = await PersonalRecord.findOne({ exercise: 'deadlift', userId }).sort({ createdAt: 1 });
    res.json(firstDeadlift);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get first personal record for benchpress for a user
router.get('/first/benchpress/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const firstBenchpress = await PersonalRecord.findOne({ exercise: 'benchPress', userId }).sort({ createdAt: 1 });
    res.json(firstBenchpress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get first personal record for squat for a user
router.get('/first/squat/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const firstSquat = await PersonalRecord.findOne({ exercise: 'squat', userId }).sort({ createdAt: 1 });
    res.json(firstSquat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
