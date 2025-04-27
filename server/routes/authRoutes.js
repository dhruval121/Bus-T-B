const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
} = require('../controllers/authController');
const { protect, admin, driver } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Admin routes
router.get('/admin/users', protect, admin, (req, res) => {
    // Admin-only route to get all users
    res.json({ message: 'Admin access granted' });
});

// Driver routes
router.get('/driver/profile', protect, driver, (req, res) => {
    // Driver-specific profile route
    res.json({ message: 'Driver access granted' });
});

module.exports = router; 