import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  useTheme,
  Box,
  Stack,
} from '@mui/material';
import { 
  Brightness4, 
  Brightness7, 
  DirectionsBus,
  Menu as MenuIcon,
  Close as CloseIcon 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme as useThemeContext } from '../context/ThemeContext';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const { darkMode, toggleTheme } = useThemeContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <DirectionsBus sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BusTracker
          </Typography>
          
          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/track">
                Track
              </Button>
              <Button color="inherit" component={Link} to="/booking">
                Book
              </Button>
              
              {/* Admin button with margin */}
              <Button 
                color="inherit" 
                component={Link} 
                to="/admin/login"
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                  },
                  mr: 2
                }}
              >
                Admin Login
              </Button>

              {/* Theme toggle button */}
              <IconButton 
                onClick={toggleTheme} 
                color="inherit"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                  },
                  ml: 1
                }}
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Stack>
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            bgcolor: theme.palette.background.default
          },
        }}
      >
        <List sx={{ mt: 8 }}>
          {['Home', 'Track', 'Book'].map((text) => (
            <ListItem 
              button 
              key={text}
              component={Link}
              to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem 
            button 
            component={Link}
            to="/admin/login"
            onClick={handleDrawerToggle}
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              my: 1,
              borderRadius: 1
            }}
          >
            <ListItemText primary="Admin Login" />
          </ListItem>
          <ListItem>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>Theme</Typography>
              <IconButton onClick={toggleTheme} color="inherit">
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Stack>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar; 