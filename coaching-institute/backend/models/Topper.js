const mongoose = require('mongoose');

const topperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  marks: {
    type: String
  },
  rank: {
    type: String
  },
  exam: {
    type: String
  },
  year: {
    type: Number
  },
  achievement: {
    type: String
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
}, { timestamps: true });

module.exports = mongoose.model('Topper', topperSchema);
