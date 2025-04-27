const Booking = require('../models/Booking');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Process payment
const processPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod, transactionId } = req.body;
    
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update payment details
    booking.payment = {
      method: paymentMethod,
      status: 'success',
      transactionId,
      paymentDate: new Date()
    };
    booking.status = 'Confirmed';
    
    await booking.save();

    // Generate ticket and receipt
    const ticketPath = await generateTicket(booking);
    const receiptPath = await generateReceipt(booking);

    res.status(200).json({
      message: 'Payment successful',
      ticket: ticketPath,
      receipt: receiptPath
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
};

// Generate bus ticket PDF
const generateTicket = async (booking) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, '../tickets', `ticket_${booking._id}.pdf`);
  
  // Create tickets directory if it doesn't exist
  if (!fs.existsSync(path.join(__dirname, '../tickets'))) {
    fs.mkdirSync(path.join(__dirname, '../tickets'));
  }

  doc.pipe(fs.createWriteStream(filePath));
  
  // Add ticket content
  doc.fontSize(20).text('Bus Ticket', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Booking ID: ${booking._id}`);
  doc.text(`Date: ${booking.date.toDateString()}`);
  doc.text(`Passengers: ${booking.passengers}`);
  doc.text(`Total Fare: ₹${booking.totalFare}`);
  doc.text(`Status: ${booking.status}`);
  
  doc.end();
  
  return filePath;
};

// Generate payment receipt PDF
const generateReceipt = async (booking) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, '../receipts', `receipt_${booking._id}.pdf`);
  
  // Create receipts directory if it doesn't exist
  if (!fs.existsSync(path.join(__dirname, '../receipts'))) {
    fs.mkdirSync(path.join(__dirname, '../receipts'));
  }

  doc.pipe(fs.createWriteStream(filePath));
  
  // Add receipt content
  doc.fontSize(20).text('Payment Receipt', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Transaction ID: ${booking.payment.transactionId}`);
  doc.text(`Payment Method: ${booking.payment.method}`);
  doc.text(`Payment Date: ${booking.payment.paymentDate.toDateString()}`);
  doc.text(`Amount: ₹${booking.totalFare}`);
  
  doc.end();
  
  return filePath;
};

module.exports = {
  processPayment,
  generateTicket,
  generateReceipt
};
