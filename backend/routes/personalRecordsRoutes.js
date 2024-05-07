const express = require('express');
const router = express.Router();
const PersonalRecord = require('../models/personalRecords');

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
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const personalRecords = await PersonalRecord.find({ userId }).sort({ createdAt: -1 });
    res.json(personalRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
