const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getFeedback,
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  approveFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');

router.get('/', getFeedback);
router.get('/all', protect, adminOnly, getAllFeedback);
router.get('/:id', getFeedbackById);
router.post('/', createFeedback);
router.put('/:id/approve', protect, adminOnly, approveFeedback);
router.delete('/:id', protect, adminOnly, deleteFeedback);

module.exports = router;
