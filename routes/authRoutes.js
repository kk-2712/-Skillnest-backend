console.log("CLEAN ROUTES LOADED");
const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  getDashboard
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private routes
router.get('/me', protect, getMe);
router.get('/dashboard', protect, getDashboard);

module.exports = router;