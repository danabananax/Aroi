/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import {
  Flex, Heading, Box, Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { recipe } from '../routes/home/HomeData';

interface RProps {
    recipe: recipe,
    recipeId: number,
}

function RecipeLink({ recipe, recipeId }: RProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipeId}`);
  };

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
