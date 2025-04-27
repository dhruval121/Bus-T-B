const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminMiddleware');

// Protected admin route to verify authentication
router.get('/verify', adminAuth, (req, res) => {
    res.json({
        authenticated: true,
        user: {
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    });
});

// Admin dashboard data
router.get('/dashboard', adminAuth, async (req, res) => {
    try {
        // Get dashboard statistics
        const stats = {
            totalUsers: await User.countDocuments(),
            totalBuses: await Bus.countDocuments(),
            totalBookings: await Booking.countDocuments(),
            totalRoutes: await Route.countDocuments()
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 