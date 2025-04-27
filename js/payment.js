// Payment Modal Functions
function showPaymentModal(from, to, baseFare) {
    const modal = document.getElementById('paymentModal');
    const routeDetails = document.getElementById('routeDetails');
    const fareDetails = document.getElementById('fareDetails');
    const baseFareElement = document.getElementById('modalBaseFare');
    const taxAmountElement = document.getElementById('modalTaxAmount');
    const totalFareElement = document.getElementById('modalTotalFare');

    // Calculate fare details
    const tax = baseFare * 0.05;
    const convenienceFee = 20;
    const totalFare = baseFare + tax + convenienceFee;

    // Update modal content
    routeDetails.textContent = `${from} → ${to}`;
    fareDetails.textContent = `Base Fare: ₹${baseFare}`;
    baseFareElement.textContent = `₹${baseFare}`;
    taxAmountElement.textContent = `₹${tax.toFixed(2)}`;
    totalFareElement.textContent = `₹${totalFare.toFixed(2)}`;

    // Show modal
    modal.style.display = 'block';

    // Add event listeners for payment method selection
    const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            hideAllPaymentForms();
            const selectedMethod = this.value;
            document.getElementById(`modal${selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)}Form`).style.display = 'block';
        });
    });
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
    hideAllPaymentForms();
}

function hideAllPaymentForms() {
    document.getElementById('modalUpiForm').style.display = 'none';
    document.getElementById('modalCardForm').style.display = 'none';
    document.getElementById('modalNetbankingForm').style.display = 'none';
}

// Payment Processing Functions
function processUPIPayment() {
    const upiId = document.getElementById('modalUpiId').value;
    if (!upiId) {
        alert('Please enter your UPI ID');
        return;
    }
    simulatePayment('UPI');
}

function processCardPayment() {
    const cardNumber = document.getElementById('modalCardNumber').value;
    const expiryDate = document.getElementById('modalExpiryDate').value;
    const cvv = document.getElementById('modalCvv').value;
    const cardName = document.getElementById('modalCardName').value;

    if (!cardNumber || !expiryDate || !cvv || !cardName) {
        alert('Please fill in all card details');
        return;
    }
    simulatePayment('Card');
}

function processNetBankingPayment() {
    const bank = document.getElementById('modalBank').value;
    if (!bank) {
        alert('Please select your bank');
        return;
    }
    simulatePayment('Net Banking');
}

function simulatePayment(method) {
    // Show loading state
    const payButton = document.querySelector('.payment-form .btn.primary');
    const originalText = payButton.textContent;
    payButton.textContent = 'Processing...';
    payButton.disabled = true;

    // Simulate payment processing
    setTimeout(() => {
        payButton.textContent = originalText;
        payButton.disabled = false;
        closePaymentModal();
        showTicketConfirmation(method);
    }, 2000);
}

// Ticket Confirmation Functions
function showTicketConfirmation(paymentMethod) {
    const modal = document.getElementById('ticketModal');
    const routeDetails = document.getElementById('routeDetails').textContent;
    const totalFare = document.getElementById('modalTotalFare').textContent;

    // Generate random booking ID
    const bookingId = 'GTB' + Math.floor(100000 + Math.random() * 900000);

    // Set ticket details
    document.getElementById('bookingId').textContent = bookingId;
    document.getElementById('ticketRoute').textContent = routeDetails;
    document.getElementById('ticketDate').textContent = new Date().toLocaleDateString();
    document.getElementById('ticketTime').textContent = new Date().toLocaleTimeString();
    document.getElementById('ticketPassengers').textContent = '1 Adult';
    document.getElementById('ticketAmount').textContent = totalFare;

    // Show ticket modal
    modal.style.display = 'block';
}

function closeTicketModal() {
    document.getElementById('ticketModal').style.display = 'none';
}

function downloadTicket() {
    const ticketContent = document.querySelector('.ticket-details').innerHTML;
    const blob = new Blob([ticketContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bus_ticket.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
} 