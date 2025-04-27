import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Divider
} from '@mui/material';
import {
  DirectionsBus,
  AccessTime,
  AttachMoney,
  AirlineSeatReclineNormal
} from '@mui/icons-material';

const gujaratRoutes = [
  {
    id: 1,
    from: 'Ahmedabad',
    to: 'Surat',
    distance: '265 km',
    duration: '4h 30m',
    price: '₹450',
    frequency: 'Every 30 mins',
    stops: ['Nadiad', 'Anand', 'Bharuch'],
    available_seats: 32,
    amenities: ['AC', 'WiFi', 'USB Charging']
  },
  {
    id: 2,
    from: 'Vadodara',
    to: 'Rajkot',
    distance: '310 km',
    duration: '5h 45m',
    price: '₹550',
    frequency: 'Every 1 hour',
    stops: ['Anand', 'Nadiad', 'Ahmedabad'],
    available_seats: 28,
    amenities: ['AC', 'WiFi', 'Snacks']
  },
  {
    id: 3,
    from: 'Surat',
    to: 'Gandhinagar',
    distance: '290 km',
    duration: '5h',
    price: '₹500',
    frequency: 'Every 45 mins',
    stops: ['Bharuch', 'Vadodara', 'Ahmedabad'],
    available_seats: 35,
    amenities: ['AC', 'Reclining Seats']
  },
  {
    id: 4,
    from: 'Ahmedabad',
    to: 'Dwarka',
    distance: '380 km',
    duration: '7h',
    price: '₹700',
    frequency: 'Every 2 hours',
    stops: ['Rajkot', 'Jamnagar'],
    available_seats: 25,
    amenities: ['AC', 'WiFi', 'Snacks', 'USB Charging']
  },
  {
    id: 5,
    from: 'Rajkot',
    to: 'Bhavnagar',
    distance: '215 km',
    duration: '4h',
    price: '₹400',
    frequency: 'Every 1 hour',
    stops: ['Botad', 'Dhandhuka'],
    available_seats: 40,
    amenities: ['AC', 'WiFi']
  },
  {
    id: 6,
    from: 'Vadodara',
    to: 'Statue of Unity',
    distance: '90 km',
    duration: '2h',
    price: '₹200',
    frequency: 'Every 30 mins',
    stops: ['Dabhoi', 'Chandod'],
    available_seats: 45,
    amenities: ['AC', 'Tour Guide']
  },
  {
    id: 7,
    from: 'Surat',
    to: 'Diu',
    distance: '380 km',
    duration: '7h 30m',
    price: '₹750',
    frequency: 'Every 3 hours',
    stops: ['Valsad', 'Bhavnagar', 'Una'],
    available_seats: 30,
    amenities: ['AC', 'WiFi', 'Meals', 'USB Charging']
  },
  {
    id: 8,
    from: 'Ahmedabad',
    to: 'Mount Abu',
    distance: '225 km',
    duration: '4h 30m',
    price: '₹500',
    frequency: 'Every 2 hours',
    stops: ['Mehsana', 'Palanpur'],
    available_seats: 38,
    amenities: ['AC', 'WiFi', 'Snacks']
  }
];

const Routes = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8, mt: 8 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Popular Bus Routes in Gujarat
      </Typography>
      <Grid container spacing={3}>
        {gujaratRoutes.map((route) => (
          <Grid item xs={12} md={6} key={route.id}>
            <Card 
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DirectionsBus color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    {route.from} → {route.to}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Distance: {route.distance} | Duration: {route.duration}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccessTime sx={{ mr: 1, fontSize: 20 }} color="action" />
                  <Typography variant="body2">
                    Frequency: {route.frequency}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AttachMoney sx={{ mr: 1, fontSize: 20 }} color="action" />
                  <Typography variant="h6" color="primary">
                    {route.price}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Stops:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {route.stops.map((stop) => (
                      <Chip 
                        key={stop} 
                        label={stop} 
                        size="small" 
                        variant="outlined" 
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Amenities:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {route.amenities.map((amenity) => (
                      <Chip 
                        key={amenity} 
                        label={amenity} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AirlineSeatReclineNormal sx={{ mr: 1, fontSize: 20 }} color="action" />
                  <Typography variant="body2">
                    Available Seats: {route.available_seats}
                  </Typography>
                </Box>

                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={() => {/* Add booking logic */}}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Routes; 