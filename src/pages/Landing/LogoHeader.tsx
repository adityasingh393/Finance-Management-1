import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const LogoHeader: React.FC = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobileOrTablet) {
    return null; // Don't render the component on mobile or tablet
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '20px', // Adjust as needed
        left: '20px', // Adjust as needed
        display: 'flex',
        alignItems: 'center',
        zIndex: 1000, // Ensure it stays on top
      }}
    >  
      <img src="src/pages/Landing/logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px', marginLeft: '25px', marginTop: '10px' }} /> {/* Adjust height as needed */}
      <Typography 
        variant="h6" 
        sx={{
          fontWeight: 700, // Make text bold
          fontFamily: 'Inter, sans-serif', // Set the font family to Inter
          color: '#0d1b2a', // Dark color for the text
          mt: '10px', // Adjust margin-top as needed
          display: 'inline', // Display as inline to align parts horizontally
        }}
      >
        PocketPal
        <Box
          component="span"
          sx={{
            color: '#ffafbd', // Different color for the period
          }}
        >
          .
        </Box>
      </Typography>
    </Box>
  );
};

export default LogoHeader;
