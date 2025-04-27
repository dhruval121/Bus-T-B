import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme as useThemeContext } from '../context/ThemeContext';

const ThemeToggle = ({ style }) => {
  const { darkMode, toggleTheme } = useThemeContext();

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        width: 45,
        height: 45,
        zIndex: 1000,
        '&:hover': {
          backgroundColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
        },
        ...style,
      }}
    >
      {darkMode ? (
        <Brightness7 sx={{ color: darkMode ? 'white' : 'inherit' }} />
      ) : (
        <Brightness4 sx={{ color: darkMode ? 'inherit' : 'black' }} />
      )}
    </IconButton>
  );
};

export default ThemeToggle; 