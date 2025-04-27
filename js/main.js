// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
    }
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Form Submissions
const bookingForm = document.getElementById('bookingForm');
const contactForm = document.getElementById('contactForm');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        from: document.getElementById('from').value,
        to: document.getElementById('to').value,
        date: document.getElementById('date').value,
        passengers: document.getElementById('passengers').value
    };

    try {
        // Here you would typically send this data to your backend
        console.log('Booking form submitted:', formData);
        alert('Booking search initiated! This is a demo version.');
        bookingForm.reset();
    } catch (error) {
        console.error('Error submitting booking:', error);
        alert('An error occurred. Please try again.');
    }
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        // Here you would typically send this data to your backend
        console.log('Contact form submitted:', formData);
        alert('Message sent successfully! This is a demo version.');
        contactForm.reset();
    } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('An error occurred. Please try again.');
    }
});

// Popular Routes Data (Demo)
const popularRoutes = [
    {
        from: 'City Center',
        to: 'Airport',
        duration: '45 mins',
        price: '$12'
    },
    {
        from: 'North Station',
        to: 'South Station',
        duration: '30 mins',
        price: '$8'
    },
    {
        from: 'West Terminal',
        to: 'East Terminal',
        duration: '35 mins',
        price: '$10'
    }
];

// Populate Popular Routes
const routesContainer = document.getElementById('routesContainer');

function createRouteCard(route) {
    const card = document.createElement('div');
    card.className = 'route-card';
    card.innerHTML = `
        <div class="route-info">
            <h3>${route.from} → ${route.to}</h3>
            <p>Duration: ${route.duration}</p>
            <p>Price: ${route.price}</p>
            <button class="btn primary" onclick="window.location.href='#book'">Book Now</button>
        </div>
    `;
    return card;
}

popularRoutes.forEach(route => {
    routesContainer.appendChild(createRouteCard(route));
});

// Add route card styles
const style = document.createElement('style');
style.textContent = `
    .route-card {
        background: var(--white);
        padding: 1.5rem;
        border-radius: 1rem;
        box-shadow: var(--shadow);
        transition: transform 0.3s;
    }

    .route-card:hover {
        transform: translateY(-5px);
    }

    .route-info h3 {
        color: var(--primary-color);
        margin-bottom: 1rem;
    }

    .route-info p {
        margin-bottom: 0.5rem;
    }

    .route-info button {
        margin-top: 1rem;
    }
`;
document.head.appendChild(style);

// Initialize date input with today's date
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;
dateInput.value = today;

// Theme Switcher
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Add smooth transition for theme change
const style = document.createElement('style');
style.textContent = `
    * {
        transition: background-color 0.3s ease, color 0.3s ease;
    }
`;
document.head.appendChild(style);

// Modal Functions
function showRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function switchToRegister() {
    closeLoginModal();
    showRegisterModal();
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Login Form Validation
function validateLoginForm() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return false;
    }

    // Basic password validation
    if (password.length < 8) {
        alert('Password must be at least 8 characters long!');
        return false;
    }

    // If validation passes, you would typically send this to your server
    alert('Login successful!');
    closeLoginModal();
    return false; // Prevent form submission for this example
}

// Add smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add hamburger animation styles
const style = document.createElement('style');
style.textContent = `
    .hamburger span {
        transition: all 0.3s ease-in-out;
    }
    
    .hamburger span.active:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger span.active:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger span.active:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style); 