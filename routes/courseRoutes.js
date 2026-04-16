const express = require('express');
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  enrollInCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public
router.get('/', getAllCourses);

// Logged-in users
router.post('/:id/enroll', protect, enrollInCourse);

// Admin only
router.post('/', protect, adminOnly, createCourse);
router.put('/:id', protect, adminOnly, updateCourse);     // ✅ moved up
router.delete('/:id', protect, adminOnly, deleteCourse);  // ✅ moved up

module.exports = router;