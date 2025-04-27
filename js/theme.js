// Theme Toggle Functionality
function initializeTheme() {
    try {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) {
            console.error('Theme toggle button not found');
            return;
        }

        const icon = themeToggle.querySelector('i');
        if (!icon) {
            console.error('Icon element not found in theme toggle');
            return;
        }

        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateIcon(icon, currentTheme);

        // Toggle theme on button click
        themeToggle.addEventListener('click', () => {
            try {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateIcon(icon, newTheme);
                
                console.log(`Theme switched to ${newTheme}`);
            } catch (error) {
                console.error('Error during theme toggle:', error);
            }
        });

        console.log('Theme initialization complete');
    } catch (error) {
        console.error('Error during theme initialization:', error);
    }
}

// Update icon based on theme
function updateIcon(icon, theme) {
    try {
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
            icon.style.color = '#f1c40f'; // Moon color
        } else {
            icon.className = 'fas fa-sun';
            icon.style.color = '#f39c12'; // Sun color
        }
    } catch (error) {
        console.error('Error updating icon:', error);
    }
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTheme);

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState !== 'loading') {
    initializeTheme();
}
