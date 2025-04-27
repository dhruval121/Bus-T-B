// Available bus routes data (Demo)
const availableRoutes = [
    {
        id: 1,
        from: 'City Center',
        to: 'Airport',
        schedule: [
            { time: '08:00', price: 12, seatsAvailable: 25 },
            { time: '10:00', price: 12, seatsAvailable: 30 },
            { time: '12:00', price: 12, seatsAvailable: 15 },
            { time: '14:00', price: 12, seatsAvailable: 20 },
            { time: '16:00', price: 12, seatsAvailable: 35 }
        ]
    },
    {
        id: 2,
        from: 'North Station',
        to: 'South Station',
        schedule: [
            { time: '09:00', price: 8, seatsAvailable: 20 },
            { time: '11:00', price: 8, seatsAvailable: 25 },
            { time: '13:00', price: 8, seatsAvailable: 30 },
            { time: '15:00', price: 8, seatsAvailable: 15 },
            { time: '17:00', price: 8, seatsAvailable: 25 }
        ]
    }
];

// List of Gujarat cities
const gujaratCities = [
    'Ahmedabad',
    'Surat',
    'Vadodara',
    'Rajkot',
    'Bhavnagar',
    'Jamnagar',
    'Junagadh',
    'Gandhinagar',
    'Anand',
    'Nadiad',
    'Bharuch',
    'Ankleshwar',
    'Vapi',
    'Navsari',
    'Morbi',
    'Surendranagar',
    'Amreli',
    'Porbandar',
    'Veraval',
    'Mehsana'
];

let currentInput = null;

function initializeAutocomplete() {
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
    
    setupAutocomplete(fromInput, 'fromSuggestions');
    setupAutocomplete(toInput, 'toSuggestions');
}

function setupAutocomplete(input, suggestionsId) {
    const suggestionsContainer = document.getElementById(suggestionsId);
    
    input.addEventListener('input', () => {
        const value = input.value.trim();
        currentInput = input;

        if (value.length > 0) {
            showSuggestions(value, suggestionsContainer);
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });
}

function showSuggestions(searchTerm, container) {
    container.innerHTML = '';
    const matches = findMatches(searchTerm);
    
    if (matches.length > 0) {
        matches.forEach(city => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = city;
            div.onclick = () => {
                        currentInput.value = city;
                container.style.display = 'none';
            };
            container.appendChild(div);
        });
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

function findMatches(searchTerm) {
    return Object.values(gujaratCities)
        .flat()
        .filter(city => 
            city.toLowerCase().includes(searchTerm.toLowerCase())
        );
}

function searchBuses() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const passengers = document.getElementById('passengers').value;
    
    const fare = calculateFare(from, to, passengers);
    showPaymentSection(fare);
}

function calculateFare(from, to, passengers) {
    const baseFare = 500; // Demo base fare
    return baseFare * passengers;
}

function showPaymentSection(fare) {
    const tax = fare * 0.05;
    const total = fare + tax;
    
    document.getElementById('baseFare').textContent = `₹${fare}`;
    document.getElementById('taxAmount').textContent = `₹${tax}`;
    document.getElementById('totalFare').textContent = `₹${total}`;

    document.getElementById('paymentSection').style.display = 'block';
}

function processPayment() {
        alert('Payment successful! Your ticket has been booked.');
    location.reload();
}

document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    searchBuses();
});

document.addEventListener('DOMContentLoaded', initializeAutocomplete);

// Function to show suggestions
function showSuggestions(inputElement, suggestionsElement, value) {
    // Clear previous suggestions
    suggestionsElement.innerHTML = '';
    suggestionsElement.style.display = 'none';

    if (!value) return;

    // Filter cities based on input
    const filteredCities = gujaratCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredCities.length === 0) return;

    // Create and append suggestion items
    filteredCities.forEach(city => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = city;
        div.addEventListener('click', () => {
            inputElement.value = city;
            suggestionsElement.style.display = 'none';
        });
        suggestionsElement.appendChild(div);
    });

    suggestionsElement.style.display = 'block';
}

// Setup event listeners when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const fromSuggestions = document.getElementById('fromSuggestions');
    const toSuggestions = document.getElementById('toSuggestions');
    const dateInput = document.getElementById('date');
    const form = document.getElementById('bookingForm');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // From input event listeners
    fromInput.addEventListener('input', (e) => {
        showSuggestions(fromInput, fromSuggestions, e.target.value);
    });

    // To input event listeners
    toInput.addEventListener('input', (e) => {
        showSuggestions(toInput, toSuggestions, e.target.value);
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.input-wrapper')) {
            fromSuggestions.style.display = 'none';
            toSuggestions.style.display = 'none';
        }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const from = fromInput.value;
        const to = toInput.value;
        const date = dateInput.value;
        const passengers = document.getElementById('passengers').value;

        // Validate inputs
        if (!gujaratCities.includes(from)) {
            alert('Please select a valid departure city from the suggestions');
            return;
        }

        if (!gujaratCities.includes(to)) {
            alert('Please select a valid destination city from the suggestions');
            return;
        }

        if (from === to) {
            alert('Departure and destination cities cannot be the same');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Searching...';

        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-search"></i> Search Buses';

            // Show results section (implement actual results display logic)
            document.getElementById('searchResults').style.display = 'block';
            // Scroll to results
            document.getElementById('searchResults').scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
});