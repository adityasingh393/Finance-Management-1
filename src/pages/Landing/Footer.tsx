import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import CommonButton from '../../components/common/CommonButton';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#ffffff', 
        padding: '2rem 0', 
        borderTop: '1px solid #e0e0e0', 
        mt: 'auto', 
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center"
        >
          <Typography 
            variant="body2" 
            color="textSecondary" 
            sx={{ marginBottom: '1rem' }}
          >
            © {new Date().getFullYear()} Financely. All rights reserved.
          </Typography>
          <CommonButton
          variant="contained"
          onClick={() => window.open('https://github.com/adityasingh393/Finance-Management-1', '_blank')}
        >
          Contribute on GitHub <GitHubIcon style={{ marginLeft: '8px' }} />
        </CommonButton>

        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
