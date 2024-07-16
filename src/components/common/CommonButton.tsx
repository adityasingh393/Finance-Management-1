import React, { ReactNode } from 'react';
import Button from "@mui/material/Button";
interface CustomButtonProps {
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    children: ReactNode; // Change from string to ReactNode
    variant?: "contained" | "outlined" | "text"; // Add variant prop
}

const CommonButton: React.FC<CustomButtonProps> = ({
    type = "button",
    disabled = false,
    loading = false,
    onClick,
    children,
    variant = "contained", // Set a default value for variant
}) => {
    return (
        <Button
          type={type}
          variant={variant} // Use the variant prop
          disabled={disabled || loading}
          size="large"
          onClick={onClick}
          sx={{
            mt: '18px',
            mb: '12px',
            backgroundColor: '#0d1b2a',
            color: 'white',
            '&:hover': { backgroundColor: '#be95c4' },
            height: 50,
            fontSize: '0.9rem',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            width: '100%',
            maxWidth: 280,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50px',
            mx: 'auto',
          }}
        >
          {children}
          {/* {loading && <Loader />} */}
        </Button>
        
    );
};

export default CommonButton;
