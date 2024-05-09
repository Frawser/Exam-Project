const express = require('express');
const router = express.Router();
const Weight = require('../models/Weight');

// Add weight
router.post('/', async (req, res) => {
  const { userId, weight: userWeight } = req.body; // Changed variable name to userWeight

  try {
    // Validate input data
    if (!userId || !userWeight) {
      return res.status(400).json({ message: 'Both userId and weight are required' });
    }

    const newWeight = new Weight({ userId, weight: userWeight }); // Changed variable name to userWeight
    await newWeight.save();
    res.status(201).json({ message: 'Weight added successfully', weight: newWeight });
    console.log('Weight added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all weight entries for a user
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const weights = await Weight.find({ userId }); // Changed variable name to weights
    res.json(weights); // Changed variable name to weights
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get the latest weight entry for a user
router.get('/latest/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const latestWeight = await Weight.findOne({ userId }).sort({ createdAt: -1 }).limit(1);
    res.json(latestWeight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
