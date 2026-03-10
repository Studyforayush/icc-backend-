require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectDBWithRetry } = require('./config/db');

connectDBWithRetry();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/toppers', require('./routes/topperRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: '✅ Coaching Institute API running successfully!' });
});

app.get('/health', (req, res) => {
  const state = mongoose.connection.readyState;
  const stateName =
    state === 0 ? 'disconnected' :
    state === 1 ? 'connected' :
    state === 2 ? 'connecting' :
    state === 3 ? 'disconnecting' :
    'unknown';

  res.json({
    ok: true,
    env: process.env.NODE_ENV,
    db: { readyState: state, status: stateName },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});
