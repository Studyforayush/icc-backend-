const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getMessages,
  getMessageById,
  createMessage,
  replyMessage,
  markAsRead,
  deleteMessage
} = require('../controllers/messageController');

router.get('/', protect, adminOnly, getMessages);
router.get('/:id', protect, adminOnly, getMessageById);
router.post('/', createMessage);
router.put('/:id/reply', protect, adminOnly, replyMessage);
router.put('/:id/read', protect, adminOnly, markAsRead);
router.delete('/:id', protect, adminOnly, deleteMessage);

module.exports = router;
