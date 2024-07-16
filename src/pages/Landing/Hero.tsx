import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { cn } from '../../lib/utils';
import GridPattern from '../../components/landing/GridPattern';
import CommonButton from '../../components/common/CommonButton';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import LogoHeader from './LogoHeader';
import { BorderBeam } from '../../components/landing/BorderBeam';
import Footer from './Footer';
const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ 
        height: '100vh', 
        position: 'relative', 
        overflowY: 'auto',
        fontFamily: 'Inter, sans-serif',
      }} 
    >  
      <Navbar />
      <LogoHeader />
      <GridPattern
        width={40}
        height={40}
        x={0}
        y={0}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          "absolute inset-0 z-0",
          "animate-pulse"
        )}
      />
      <Box
        textAlign="center"
        position="relative"
        zIndex={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        mt={88}
      >
        <Typography 
          variant="h4" 
          sx={{
            color: '#0d1b2a',
            fontWeight: 900,
            mb: 2,
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          Let&apos;s get started
        </Typography>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{
            color: '#0d1b2a',
            fontWeight: 920,
            mb: 2,
            fontSize: { xs: '2.5rem', sm: '4rem' },
            lineHeight: { xs: 1.1, sm: 1.2 },
            textAlign: 'center',
            letterSpacing: { xs: '0.07rem', sm: '0.14rem' },
            ...(typeof window !== 'undefined' && window.innerWidth >= 600 ? { sm: { letterSpacing: '0.1rem' } } : {}),
          }}
        >
          Effortlessly Track and <br /> Manage <span style={{ 
            background: 'linear-gradient(45deg, #ffafbd, #d5a6f2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 920,
            letterSpacing: '0.05rem',
            ...(typeof window !== 'undefined' && window.innerWidth >= 600 ? { sm: { letterSpacing: '0.1rem' } } : {}),
          }}>Expenses.</span>
        </Typography>
        <Typography 
          variant="h6" 
          sx={{
            color: '#0d1b2a',
            fontWeight: 500,
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.25rem' },
            lineHeight: { xs: 1.3, sm: 1.5 },
          }}
        >
          Our easy-to-use platform helps you manage expenses effectively <br />
          and efficiently, so you can focus on what matters.
        </Typography>
        <Box 
          mb={5}  // Added margin-bottom for space
        >
          <CommonButton 
            onClick={() => {navigate('/login')}}
            variant="contained" 
            // sx={{marginbottom: '5px'}}  // Added margin-bottom for space
          >
            Get started
          </CommonButton>
        </Box>
        
        {/* New Content */}
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center"
          gap={2}
          sx={{ width: '100%', maxWidth: '800px', textAlign: 'left', mx: 'auto' }}
        >
            <Typography 
              variant="h2" 
              sx={{
                color: '#0d1b2a',
                fontWeight: 900,
                mb: 2,
                fontSize: { xs: '1.8rem', sm: '2.2rem' },
                textAlign: 'center',
                mt: 3,
              }}
            >
              Why use{' '}
              <span
                style={{
                  background: 'linear-gradient(45deg, #ffafbd, #d5a6f2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 900,
                }}
              >
                PocketPal?
              </span>
            </Typography>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}
              >
                <ol style={{ paddingLeft: '1.5rem', listStylePosition: 'inside' }}>
                  <li>
                    <Typography 
                      variant="h6" 
                      sx={{ color: '#0d1b2a', fontWeight: 700 }}
                    >
                      1. Easy to use:
                    </Typography>
                    <Typography variant="body1">
                      Track expenses on-the-go with categorization and logging.
                    </Typography>
                  </li>
                  <li>
                    <Typography 
                      variant="h6" 
                      sx={{ color: '#0d1b2a', fontWeight: 700  }}
                    >
                      2. Data-driven insights:
                    </Typography>
                    <Typography variant="body1">
                      Expense tracker can provide valuable insights into your spending habits, allowing you to make more informed decisions.
                    </Typography>
                  </li>
                  <li>
                    <Typography 
                      variant="h6" 
                      sx={{ color: '#0d1b2a', fontWeight: 700 }}
                    >
                      3. Identify overspending:
                    </Typography>
                    <Typography variant="body1">
                      Take control of your finances by identifying and reducing overspending with an expense tracker.
                    </Typography>
                  </li>
                  <li>
                    <Typography 
                      variant="h6" 
                      sx={{ color: '#0d1b2a', fontWeight: 700 }}
                    >
                      4. Real-time visibility:
                    </Typography>
                    <Typography variant="body1">
                      Monitor your expenses in real-time, whether you are at home or on-the-go, with a user-friendly interface.
                    </Typography>
                  </li>
                </ol>
              </Box>

              <Typography 
                variant="h2" 
                sx={{
                  color: '#0d1b2a',  // Default text color
                  fontWeight: 900,
                  mt: 4,
                  fontSize: { xs: '1.8rem', sm: '2.2rem' },
                  textAlign: 'center',
                  // No need for background properties here
                }}
              >
                Simple yet, <span style={{
                  background: 'linear-gradient(45deg, #ffafbd, #d5a6f2)',  // Gradient for "Powerful"
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 900,  // Match the font weight of the rest of the text
                }}>Powerful</span> Features.
              </Typography>

              
              {/* BorderBeamDemo Section */}
              <Box 
                mt={8}
                mb={10}
                position="relative"
                width="100%"
                height="auto"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ overflow: 'hidden' , borderRadius: '0.75rem' }}
              >
                {/* Border Beam Effect */}
                <BorderBeam 
                  size={280} 
                  duration={12} 
                  delay={9} 
                  className="absolute inset-0 z-10" 
                />
               <img 
                  src="/src/pages/Landing/hero.png" 
                  alt="Hero" 
                  className="w-full h-auto object-cover shadow-lg" 
                  style={{
                    boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.2)',  // More pronounced shadow
                    borderRadius: '0.75rem',  // Rounded corners
                    filter: 'blur(0px)',  // No blur effect (adjust if needed)
                  }}
            />
          </Box>
        </Box>
        <Footer />
      </Box>
      
    </Container>
  );
};

export default Hero;
