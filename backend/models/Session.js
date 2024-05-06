const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number,
    required: false
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
