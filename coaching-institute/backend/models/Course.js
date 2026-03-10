const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String
  },
  timing: {
    type: String
  },
  category: {
    type: String
  },
  syllabus: [{
    topic: String,
    description: String
  }],
  thumbnail: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  enrolledCount: {
    type: Number,
    default: 0
  },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
