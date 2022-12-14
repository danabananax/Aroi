/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import {
  Flex, Heading, Box, Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { RecipeLinkProps } from '../types';

function RecipeLink({ recipe, setSelectedRecipe }: RecipeLinkProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedRecipe(recipe);
    navigate('/recipe');
  };
  // TODO: Modify existing cards corresponding to the design
  return (
    <Flex
      direction="row"
      w="400px"
      justify="space-between"
      m={2}
      p={4}
      borderRadius="9"
      boxShadow="md"
      onClick={handleClick}
    >
      <Heading>
        {recipe.name}
      </Heading>
      <Box>
        <Text>{`Servings: ${recipe.servings}`}</Text>
        <Text>{`Time: ${recipe.active_time}`}</Text>
      </Box>
    </Flex>
  );
}

export default RecipeLink;
