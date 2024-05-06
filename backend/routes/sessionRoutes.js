const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// Create a new session
router.post('/', async (req, res) => {
  const { userId, duration } = req.body;

  try {
    // Validate input data
    if (!userId || !duration) {
      return res.status(400).json({ message: 'Both userId and duration are required' });
    }

    const session = new Session({ userId, duration });
    await session.save();
    res.status(201).json({ message: 'Session created successfully', session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all sessions for a user
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const sessions = await Session.find({ userId });
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a session
router.delete('/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId;

  try {
    const deletedSession = await Session.findByIdAndDelete(sessionId);
    if (!deletedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a session
router.put('/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId;
  const { duration } = req.body;

  try {
    // Validate input data
    if (!duration) {
      return res.status(400).json({ message: 'Duration is required' });
    }

    const updatedSession = await Session.findByIdAndUpdate(sessionId, { duration }, { new: true });
    if (!updatedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json({ message: 'Session updated successfully', updatedSession });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
