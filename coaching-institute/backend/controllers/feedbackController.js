const Feedback = require('../models/Feedback');

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ isApproved: true }).populate('student', 'name').populate('course', 'title');
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().populate('student', 'name').populate('course', 'title');
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('student', 'name').populate('course', 'title');
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
