import React from 'react';
import { Typography, Button, Box, Container } from '@mui/material';
import { cn } from '../../lib/utils';
import GridPattern from '../../components/landing/GridPattern';
import CommonButton from '../../components/common/CommonButton';

const Hero: React.FC = () => {
  return (
    <Container
      maxWidth={false}  // Make the container take the full width
      disableGutters  // Remove default padding
      sx={{ 
        height: '100vh', 
        position: 'relative', 
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',  // Set the font family to Inter
      }} 
    >
      {/* Background GridPattern with Linear Gradient */}
      <GridPattern
        width={40}  // Adjusted width for the grid pattern
        height={40} // Adjusted height for the grid pattern
        x={0}  // Adjusted to start from the top left corner
        y={0}  // Adjusted to start from the top left corner
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          "absolute inset-0 z-0",  // Ensure it covers the entire viewport and sits behind content
          "animate-pulse"  // Added a simple animation effect
        )}
      />

      {/* Content */}
      <Box
        textAlign="center"
        position="relative"
        zIndex={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Typography 
          variant="h4" 
          sx={{
            color: '#0d1b2a',  // Dark color for the subheading
            fontWeight: 900,  // Make text bold
            mb: 2,  // Add margin-bottom
            fontSize: '2rem',  // Adjust font size
          }}
        >
          Let&apos;s get started
        </Typography>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{
            color: '#0d1b2a',  // Dark color for the main text
            fontWeight: 920,  // Make text bold
            mb: 2,  // Add margin-bottom
            fontSize: '4rem',  // Adjust font size
            lineHeight: 1.2,  // Adjust line height for better readability
            textAlign: 'center',
          }}
        >
          Effortlessly Track and <br /> Manage <span style={{ 
            background: 'linear-gradient(45deg, #ffafbd, #d5a6f2)',  // Gradient from light pink to purple
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 920,
          }}>Expenses.</span>
        </Typography>
        <Typography 
          variant="h6" 
          sx={{
            color: '#0d1b2a',  // Darker color for the subheading
            fontWeight: 500,
            mb: 4,  // Add margin-bottom
            fontSize: '1.25rem',  // Adjust font size
            lineHeight: 1.5,  // Adjust line height for better readability
          }}
        >
          Our easy-to-use platform helps you manage expenses effectively <br />
          and efficiently, so you can focus on what matters.
        </Typography>
        <Box 
          mt={3} 
          display="flex" 
          flexDirection="column" 
          alignItems="center"
          gap={2}  // Add gap between buttons
        >
          <CommonButton 
            onClick={() => {}}  // Provide an empty arrow function as a placeholder
            variant="contained" 
            color="primary"
          >
            Get started
          </CommonButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
