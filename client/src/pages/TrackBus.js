import React, { useState, useEffect } from 'react';
import { 
  GoogleMap, 
  LoadScript, 
  Marker 
} from '@react-google-maps/api';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';
import axios from 'axios';

const TrackBus = () => {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  const mapContainerStyle = {
    width: '100%',
    height: '500px'
  };

  const center = {
    lat: 40.7128,
    lng: -74.0060
  };

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/buses');
        setBuses(response.data);
      } catch (error) {
        console.error('Error fetching buses:', error);
      }
    };

    fetchBuses();
    const interval = setInterval(fetchBuses, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: 'flex', mt: 8, p: 3, gap: 3 }}>
      <Box sx={{ flex: 2 }}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
          >
            {buses.map((bus) => (
              <Marker
                key={bus._id}
                position={bus.currentLocation}
                onClick={() => setSelectedBus(bus)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </Box>
      <Paper sx={{ flex: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Available Buses
        </Typography>
        <List>
          {buses.map((bus) => (
            <ListItem 
              key={bus._id}
              button
              selected={selectedBus?._id === bus._id}
              onClick={() => setSelectedBus(bus)}
            >
              <ListItemText
                primary={`Bus ${bus.busId}`}
                secondary={`Route: ${bus.route.from} → ${bus.route.to}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default TrackBus; 