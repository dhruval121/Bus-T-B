const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    from: {
        city: {
            type: String,
            required: true
        },
        coordinates: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }
    },
    to: {
        city: {
            type: String,
            required: true
        },
        coordinates: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }
    },
    distance: {
        type: Number,
        required: true
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    stops: [{
        city: {
            type: String,
            required: true
        },
        coordinates: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
        arrivalTime: String,
        departureTime: String
    }],
    schedule: [{
        departureTime: {
            type: String,
            required: true
        },
        arrivalTime: {
            type: String,
            required: true
        },
        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'specific-days'],
            default: 'daily'
        },
        days: [{
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }],
        fare: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

// Create 2dsphere indexes for location queries
routeSchema.index({ 'from.coordinates': '2dsphere' });
routeSchema.index({ 'to.coordinates': '2dsphere' });
routeSchema.index({ 'stops.coordinates': '2dsphere' });

module.exports = mongoose.model('Route', routeSchema); 