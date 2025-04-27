// Demo bus data with mock coordinates
const busData = [
    {
        id: 'BUS001',
        route: 'City Center → Airport',
        currentLocation: { lat: 40.7128, lng: -74.0060 },
        status: 'On Time',
        nextStop: 'Terminal 1',
        capacity: '70%'
    },
    {
        id: 'BUS002',
        route: 'North Station → South Station',
        currentLocation: { lat: 40.7580, lng: -73.9855 },
        status: 'Delayed',
        nextStop: 'Central Park',
        capacity: '85%'
    },
    {
        id: 'BUS003',
        route: 'West Terminal → East Terminal',
        currentLocation: { lat: 40.7829, lng: -73.9654 },
        status: 'On Time',
        nextStop: 'Main Street',
        capacity: '45%'
    }
];

// Initialize Google Maps
let map;
let markers = [];

function initMap() {
    // Create map centered on a default location
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12,
        styles: [
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'on' }]
            }
        ]
    });

    // Add bus markers to the map
    busData.forEach(bus => {
        const marker = new google.maps.Marker({
            position: bus.currentLocation,
            map: map,
            title: bus.route,
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }
        });

        // Add info window to marker
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="info-window">
                    <h3>${bus.route}</h3>
                    <p>Bus ID: ${bus.id}</p>
                    <p>Status: ${bus.status}</p>
                    <p>Next Stop: ${bus.nextStop}</p>
                    <p>Capacity: ${bus.capacity}</p>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });

    // Populate bus list
    updateBusList();
}

// Update bus list in sidebar
function updateBusList() {
    const busItems = document.getElementById('busItems');
    busItems.innerHTML = '';

    busData.forEach(bus => {
        const busItem = document.createElement('div');
        busItem.className = 'bus-item';
        busItem.innerHTML = `
            <h4>${bus.route}</h4>
            <p class="status ${bus.status.toLowerCase().replace(' ', '-')}">${bus.status}</p>
            <p>Next Stop: ${bus.nextStop}</p>
            <p>Capacity: ${bus.capacity}</p>
            <button class="btn primary track-btn" data-bus-id="${bus.id}">Track</button>
        `;
        busItems.appendChild(busItem);

        // Add click event to track button
        const trackBtn = busItem.querySelector('.track-btn');
        trackBtn.addEventListener('click', () => {
            const busLocation = bus.currentLocation;
            map.panTo(busLocation);
            map.setZoom(15);

            // Highlight the selected bus marker
            markers.forEach(marker => {
                if (marker.getTitle() === bus.route) {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(() => marker.setAnimation(null), 2100);
                }
            });
        });
    });
}

// Add styles for bus list
const style = document.createElement('style');
style.textContent = `
    .bus-item {
        background: var(--white);
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .bus-item h4 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }

    .status {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .status.on-time {
        background: #dcfce7;
        color: #166534;
    }

    .status.delayed {
        background: #fee2e2;
        color: #991b1b;
    }

    .track-btn {
        width: 100%;
        margin-top: 0.5rem;
    }

    .info-window {
        padding: 0.5rem;
    }

    .info-window h3 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }

    .info-window p {
        margin-bottom: 0.25rem;
    }
`;
document.head.appendChild(style);

// Simulate real-time updates
function simulateMovement() {
    busData.forEach((bus, index) => {
        // Simulate small random movement
        bus.currentLocation.lat += (Math.random() - 0.5) * 0.001;
        bus.currentLocation.lng += (Math.random() - 0.5) * 0.001;

        // Update marker position
        if (markers[index]) {
            markers[index].setPosition(bus.currentLocation);
        }
    });
}

// Update positions every 3 seconds
setInterval(simulateMovement, 3000);

// Initialize map when the page loads
window.addEventListener('load', initMap); 