import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentMethod from '../components/PaymentMethod';
import '../styles/payment.css';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    selectedBank: ''
  });
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    if (!location.state?.booking) {
      navigate('/');
    } else {
      setBookingDetails(location.state.booking);
    }
  }, [location, navigate]);

  const handlePayment = async () => {
    try {
      const paymentData = {
        bookingId: bookingDetails._id,
        paymentMethod: selectedMethod,
        transactionId: `TXN${Date.now()}`
      };

      const response = await axios.post('/api/payments/process', paymentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data) {
        // Download ticket and receipt
        window.open(response.data.ticket, '_blank');
        window.open(response.data.receipt, '_blank');
        navigate('/booking-success');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="payment-container">
      <h2>Payment Options</h2>
      <div className="payment-methods">
        <PaymentMethod 
          type="bank"
          label="Bank Transfer"
          onSelect={() => setSelectedMethod('bank')}
          isSelected={selectedMethod === 'bank'}
        />
        <PaymentMethod 
          type="upi"
          label="UPI Payment"
          onSelect={() => setSelectedMethod('upi')}
          isSelected={selectedMethod === 'upi'}
        />
        <PaymentMethod 
          type="card"
          label="Credit/Debit Card"
          onSelect={() => setSelectedMethod('card')}
          isSelected={selectedMethod === 'card'}
        />
      </div>

      {selectedMethod === 'bank' && (
        <div className="payment-form">
          <select 
            name="selectedBank"
            value={paymentDetails.selectedBank}
            onChange={handleInputChange}
          >
            <option value="">Select Bank</option>
            <option value="sbi">State Bank of India</option>
            <option value="hdfc">HDFC Bank</option>
            <option value="icici">ICICI Bank</option>
            <option value="axis">Axis Bank</option>
          </select>
        </div>
      )}

      {selectedMethod === 'upi' && (
        <div className="payment-form">
          <input 
            type="text" 
            name="upiId"
            placeholder="Enter UPI ID" 
            value={paymentDetails.upiId}
            onChange={handleInputChange}
          />
        </div>
      )}

      {selectedMethod === 'card' && (
        <div className="payment-form">
          <input 
            type="text" 
            name="cardNumber"
            placeholder="Card Number" 
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
          />
          <input 
            type="text" 
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)" 
            value={paymentDetails.expiryDate}
            onChange={handleInputChange}
          />
          <input 
            type="text" 
            name="cvv"
            placeholder="CVV" 
            value={paymentDetails.cvv}
            onChange={handleInputChange}
          />
        </div>
      )}

      <div className="booking-summary">
        <h3>Booking Summary</h3>
        {bookingDetails && (
          <>
            <p>Date: {new Date(bookingDetails.date).toDateString()}</p>
            <p>Passengers: {bookingDetails.passengers}</p>
            <p>Total Fare: ₹{bookingDetails.totalFare}</p>
          </>
        )}
      </div>

      <button 
        className="pay-button"
        onClick={handlePayment}
        disabled={!selectedMethod}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Payment;
