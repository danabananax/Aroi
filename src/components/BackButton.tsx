import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

function BackButton() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };

  return (
    <IconButton icon={<ArrowBackIcon boxSize="32px" />} variant="ghost" aria-label="Back button" onClick={handleBack} />
  );
}

export default BackButton;
