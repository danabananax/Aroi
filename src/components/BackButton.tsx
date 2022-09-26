import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };

  return (
    <Button onClick={handleBack} m={2}>
      Back
    </Button>
  );
}

export default BackButton;
