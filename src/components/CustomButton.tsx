import React from 'react';
import Button from '@mui/material/Button';

type CustomButtonProps = {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const CustomButton = ({text, icon, onClick}: CustomButtonProps) => {
  return (
    <Button
      variant="contained"
      endIcon={icon}
      onClick={onClick}>
      {text}
    </Button>
  );
}

export default CustomButton;