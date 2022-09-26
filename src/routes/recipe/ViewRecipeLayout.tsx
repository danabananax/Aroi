import React from 'react';
import {
  Box, Fade, Flex, Heading,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { ViewRecipeProps } from '../../types';

function ViewRecipeLayout({ signedInUser, selectedRecipe }: ViewRecipeProps) {
  const userId = signedInUser?.uid;

  return userId && selectedRecipe ? (
    <div>
      <Heading size="3xl">View Recipe</Heading>
      <BackButton />
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
