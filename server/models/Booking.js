const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },
  schedule: {
    departureTime: String,
    arrivalTime: String,
    date: Date
  },
  passengers: [{
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    seatNumber: {
      type: String,
      required: true
    }
  }],
  fare: {
    baseFare: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      required: true
    },
    convenienceFee: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  payment: {
    method: {
      type: String,
      enum: ['UPI', 'Card', 'Net Banking'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paymentDate: Date
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  cancellation: {
    reason: String,
    refundAmount: Number,
    cancelledAt: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate booking ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    this.bookingId = 'GTB' + Math.floor(100000 + Math.random() * 900000);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema); 