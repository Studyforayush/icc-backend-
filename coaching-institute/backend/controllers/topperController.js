const Topper = require('../models/Topper');

exports.getToppers = async (req, res) => {
  try {
    const toppers = await Topper.find().populate('course', 'title');
    res.json(toppers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTopperId = async (req, res) => {
  try {
    const topper = await Topper.findById(req.params.id).populate('course', 'title');
    if (!topper) return res.status(404).json({ message: 'Topper not found' });
    res.json(topper);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTopper = async (req, res) => {
  try {
    const topper = await Topper.create(req.body);
    res.status(201).json(topper);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTopper = async (req, res) => {
  try {
    const topper = await Topper.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(topper);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTopper = async (req, res) => {
  try {
    await Topper.findByIdAndDelete(req.params.id);
    res.json({ message: 'Topper deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
