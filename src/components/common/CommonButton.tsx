import React from 'react';
import { Button } from '@mui/material';

interface CommonButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    variant?: 'text' | 'outlined' | 'contained';
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    sx?: object;
}

const CommonButton: React.FC<CommonButtonProps> = ({
    onClick,
    children,
    color = 'primary',
    variant = 'contained',
    disabled = false,
    size = 'small',
    sx = {},
}) => {
    return (
        <Button
            onClick={onClick}
            color={color}
            variant={variant}
            disabled={disabled}
            size={size}
            sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                textTransform: 'none',
                px: 4,
                py: 2,
                borderRadius: 50,
                backgroundColor: '#001219',
                color: '#ffffff',
                '&:hover': {
                    backgroundColor: '#415a77',
                },
                '&:disabled': {
                    backgroundColor: '#333',
                },
                ...sx,
            }}
        >
            {children}
        </Button>
    );
};

export default CommonButton;
