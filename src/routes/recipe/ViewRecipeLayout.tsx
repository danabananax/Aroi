import {
  Box,
  Button, Fade, Flex, Heading,
} from '@chakra-ui/react';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ViewRecipeProps } from '../../types';

function ViewRecipeLayout({ signedInUser, selectedRecipe }: ViewRecipeProps) {
  const userId = signedInUser?.uid;
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };

  return userId && selectedRecipe ? (
    <div>
      <Heading size="3xl">View Recipe</Heading>
      <Button onClick={handleBack} m={2}>
        Back
      </Button>
      <Fade in>
        <Heading>{selectedRecipe.name}</Heading>
        <Box m={6}>
          {Object.keys(selectedRecipe.ingredients).map((key) => (
            <Flex
              justify="space-between"
              w="350px"
              key={`id${Math.random().toString(16).slice(2)}`}
            >
              <Box>{key}</Box>
              <Box>{selectedRecipe.ingredients[key]}</Box>
            </Flex>
          ))}
        </Box>
        {selectedRecipe.method.map((method) => (
          <Box key={`id${Math.random().toString(16).slice(2)}`}>{method}</Box>
        ))}
      </Fade>
    </div>
  )
    : <Navigate to="/login" />;
}

export default ViewRecipeLayout;
