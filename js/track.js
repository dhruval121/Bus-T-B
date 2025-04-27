let map;
let markers = [];
let activeInfoWindow = null;

// Demo bus data
const busesData = [
    {
        id: 'GJ01AB1234',
        route: 'Ahmedabad → Surat',
        currentLocation: { lat: 23.0225, lng: 72.5714 },
        status: 'On Time',
        speed: '60 km/h',
        nextStop: 'Nadiad',
        eta: '10:30 AM',
        driver: 'Rajesh Patel',
        contact: '+91 98765 43210',
        lastUpdated: '2 mins ago'
    },
    {
        id: 'GJ05CD5678',
        route: 'Vadodara → Rajkot',
        currentLocation: { lat: 22.3072, lng: 73.1812 },
        status: 'Delayed',
        speed: '55 km/h',
        nextStop: 'Anand',
        eta: '11:15 AM',
        driver: 'Amit Shah',
        contact: '+91 98765 43211',
        lastUpdated: '5 mins ago'
    },
    // Add more buses as needed
];

function initMap() {
    // Initialize map centered on Gujarat
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 22.2587, lng: 71.1924 },
        zoom: 7,
        styles: [
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'on' }]
            }
        ]
    });

    // Add bus markers
    addBusMarkers();
    
    // Populate bus list
    populateBusList();

    // Start real-time updates
    startRealTimeUpdates();
}

function createBusMarker(bus) {
    return new google.maps.Marker({
        position: bus.currentLocation,
        map: map,
        title: bus.route,
        icon: {
            url: 'images/bus-marker.svg',
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20)
        },
        // Add animation for better visibility
        animation: google.maps.Animation.DROP
    });
}

function addBusMarkers() {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    busesData.forEach(bus => {
        const marker = createBusMarker(bus);

        // Add click listener
        marker.addListener('click', () => {
            // Bounce animation when clicked
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => marker.setAnimation(null), 750);
            
            showBusInfo(bus);
            highlightBusInList(bus.id);
        });

        markers.push(marker);
    });
}

function populateBusList() {
    const busListContainer = document.getElementById('activeBuses');
    busListContainer.innerHTML = '';

    busesData.forEach(bus => {
        const busItem = document.createElement('div');
        busItem.className = 'bus-item';
        busItem.setAttribute('data-bus-id', bus.id);
        busItem.innerHTML = `
            <h4>${bus.route}</h4>
            <p>Bus No: ${bus.id}</p>
            <p>Status: <span class="status-badge status-${bus.status.toLowerCase().replace(' ', '-')}">${bus.status}</span></p>
            <p>Next Stop: ${bus.nextStop}</p>
        `;

        busItem.addEventListener('click', () => {
            showBusInfo(bus);
            highlightBusInList(bus.id);
            map.panTo(bus.currentLocation);
            map.setZoom(12);
        });

        busListContainer.appendChild(busItem);
    });
}

function showBusInfo(bus) {
    const busInfo = document.getElementById('busInfo');
    const content = document.getElementById('busInfoContent');

    content.innerHTML = `
        <div class="info-item">
            <label>Bus Number:</label>
            <span>${bus.id}</span>
        </div>
        <div class="info-item">
            <label>Route:</label>
            <span>${bus.route}</span>
        </div>
        <div class="info-item">
            <label>Status:</label>
            <span class="status-badge status-${bus.status.toLowerCase().replace(' ', '-')}">${bus.status}</span>
        </div>
        <div class="info-item">
            <label>Current Speed:</label>
            <span>${bus.speed}</span>
        </div>
        <div class="info-item">
            <label>Next Stop:</label>
            <span>${bus.nextStop}</span>
        </div>
        <div class="info-item">
            <label>ETA:</label>
            <span>${bus.eta}</span>
        </div>
        <div class="info-item">
            <label>Driver:</label>
            <span>${bus.driver}</span>
        </div>
        <div class="info-item">
            <label>Contact:</label>
            <span>${bus.contact}</span>
        </div>
        <div class="info-item">
            <label>Last Updated:</label>
            <span>${bus.lastUpdated}</span>
        </div>
    `;

    busInfo.classList.add('active');

    // Find and select the corresponding marker
    const markerIndex = busesData.findIndex(b => b.id === bus.id);
    if (markerIndex !== -1) {
        selectMarker(markerIndex);
    }
}

function closeBusInfo() {
    document.getElementById('busInfo').classList.remove('active');
}

function highlightBusInList(busId) {
    document.querySelectorAll('.bus-item').forEach(item => {
        item.classList.remove('selected');
    });
    document.querySelector(`.bus-item[data-bus-id="${busId}"]`).classList.add('selected');
}

function searchBus() {
    const searchTerm = document.getElementById('busSearch').value.toLowerCase();
    
    const filteredBuses = busesData.filter(bus => 
        bus.id.toLowerCase().includes(searchTerm) || 
        bus.route.toLowerCase().includes(searchTerm)
    );

    // Update markers and list with filtered results
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    filteredBuses.forEach(bus => {
        addBusMarker(bus);
    });

    populateBusList(filteredBuses);
}

function startRealTimeUpdates() {
    // Simulate real-time updates every 10 seconds
    setInterval(() => {
        busesData.forEach(bus => {
            // Simulate movement by slightly changing coordinates
            bus.currentLocation.lat += (Math.random() - 0.5) * 0.01;
            bus.currentLocation.lng += (Math.random() - 0.5) * 0.01;
        });

        // Update markers on the map
        addBusMarkers();
    }, 10000);
}

// Add this function to create different colored markers based on bus status
function getBusMarkerIcon(status) {
    const colors = {
        'on time': '#10B981', // Green
        'delayed': '#EF4444', // Red
        'default': '#2563EB' // Blue
    };

    const color = colors[status.toLowerCase()] || colors.default;

    return {
        url: `data:image/svg+xml;utf8,${encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="${color}" stroke="white" stroke-width="2"/>
                <path d="M28 15h-1V12c0-1.1-.9-2-2-2h-10c-1.1 0-2 .9-2 2v3h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1v3c0 .55.45 1 1 1v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1c.55 0 1-.45 1-1v-3h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1zM15 23c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm1-4H14v-5h12v5z" fill="white"/>
            </svg>
        `)}`,
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20)
    };
}

// Update the createBusMarker function to use status-based icons
function createBusMarker(bus) {
    return new google.maps.Marker({
        position: bus.currentLocation,
        map: map,
        title: bus.route,
        icon: getBusMarkerIcon(bus.status),
        animation: google.maps.Animation.DROP
    });
}

// Add marker pulse effect
function addMarkerPulse(marker) {
    let scale = 1;
    let growing = true;

    setInterval(() => {
        if (growing) {
            scale += 0.01;
            if (scale >= 1.1) growing = false;
        } else {
            scale -= 0.01;
            if (scale <= 1) growing = true;
        }

        marker.setIcon({
            ...marker.getIcon(),
            scaledSize: new google.maps.Size(40 * scale, 40 * scale)
        });
    }, 50);
}

// Add this to your existing code to handle marker updates
function updateMarkerPosition(marker, newPosition) {
    const icon = marker.getIcon();
    
    // Smooth transition
    const numSteps = 20;
    const deltaLat = (newPosition.lat - marker.getPosition().lat()) / numSteps;
    const deltaLng = (newPosition.lng - marker.getPosition().lng()) / numSteps;
    
    let step = 0;
    
    const interval = setInterval(() => {
        step++;
        
        const lat = marker.getPosition().lat() + deltaLat;
        const lng = marker.getPosition().lng() + deltaLng;
        
        marker.setPosition({ lat, lng });
        
        if (step >= numSteps) {
            clearInterval(interval);
        }
    }, 50);
}

function selectMarker(markerId) {
    markers.forEach((marker, index) => {
        if (index === markerId) {
            marker.setIcon({
                ...marker.getIcon(),
                scaledSize: new google.maps.Size(48, 48)
            });
            marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
        } else {
            marker.setIcon({
                ...marker.getIcon(),
                scaledSize: new google.maps.Size(40, 40)
            });
            marker.setZIndex(google.maps.Marker.MAX_ZINDEX);
        }
    });
}

// Initialize map when the page loads
window.addEventListener('load', initMap); 