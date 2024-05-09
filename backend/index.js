require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessionRoutes');
const weightRoutes = require('./routes/weightRoutes');
const personalRecordsRoutes = require('./routes/personalRecordsRoutes');


const app = express();

// Middleware
app.use(cors()); // CORS middleware should be placed before defining routes
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/weight', weightRoutes);
app.use('/api/personal-records', personalRecordsRoutes);

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
