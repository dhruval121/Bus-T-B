import React from 'react';
import '../styles/payment.css';

const PaymentMethod = ({ type, label, onSelect, isSelected }) => {
  const getIcon = () => {
    switch (type) {
      case 'bank':
        return '🏦';
      case 'upi':
        return '📱';
      case 'card':
        return '💳';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`payment-method ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="payment-icon">{getIcon()}</div>
      <div className="payment-label">{label}</div>
    </div>
  );
};

export default PaymentMethod;
