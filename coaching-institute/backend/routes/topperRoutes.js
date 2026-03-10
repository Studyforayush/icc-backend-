const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getToppers,
  getTopperId,
  createTopper,
  updateTopper,
  deleteTopper
} = require('../controllers/topperController');

router.get('/', getToppers);
router.get('/:id', getTopperId);
router.post('/', protect, adminOnly, createTopper);
router.put('/:id', protect, adminOnly, updateTopper);
router.delete('/:id', protect, adminOnly, deleteTopper);

module.exports = router;
