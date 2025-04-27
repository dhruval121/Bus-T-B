const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true
  },
  busType: {
    type: String,
    enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper'],
    required: true
  },
  totalSeats: {
    type: Number,
    required: true
  },
  amenities: [{
    type: String,
    enum: ['WiFi', 'USB Charging', 'AC', 'Water Bottle', 'Snacks', 'Blanket', 'Pillow']
  }],
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create 2dsphere index for location queries
busSchema.index({ currentLocation: '2dsphere' });

module.exports = mongoose.model('Bus', busSchema); 