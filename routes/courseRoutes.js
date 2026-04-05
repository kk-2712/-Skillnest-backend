const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  enrollInCourse,
} = require('../controllers/courseController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public
router.get('/', getAllCourses);

// Admin only
router.post('/', protect, adminOnly, createCourse);

// Logged-in users
router.post('/:id/enroll', protect, enrollInCourse);

module.exports = router;