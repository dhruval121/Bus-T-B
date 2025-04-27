const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Bus = require('./models/Bus');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/buses', require('./routes/bus'));
app.use('/api/routes', require('./routes/route'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/payments', require('./routes/payment'));
// Socket.io
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('updateBusLocation', async (data) => {
        try {
            const { busId, location } = data;
            // Update bus location in database
            await Bus.findByIdAndUpdate(busId, {
                currentLocation: location,
                lastUpdated: Date.now()
            });
            // Broadcast updated location to all clients
            io.emit('busLocationUpdated', data);
        } catch (error) {
            console.error('Socket error:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 