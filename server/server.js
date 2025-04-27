const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Handle bus location updates
    socket.on('update-bus-location', (data) => {
        io.emit('bus-location-updated', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Routes
const authRoutes = require('./routes/auth');
const busRoutes = require('./routes/bus');
const routeRoutes = require('./routes/route');
const bookingRoutes = require('./routes/booking');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/bus', busRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 