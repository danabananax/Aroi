/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import {
  Flex, Heading, Box, Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { recipe } from '../../types';

interface RecipeLinkProps {
    recipe: recipe
    setSelectedRecipe: React.Dispatch<recipe>
}

function RecipeLink({ recipe, setSelectedRecipe }: RecipeLinkProps) {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setSelectedRecipe(recipe);
    navigate('/recipe');
  };

  return (
    <Flex
      as="button"
      direction="column"
      w="300px"
      justify="flex-end"
      alignItems="flex-start"
      textAlign="left"
      m={2}
      p={4}
      borderRadius="9"
      boxShadow="md"
      onClick={handleLinkClick}
    >
      <Heading size="lg">
        {recipe.name}
      </Heading>
     {/*  <Box>
        <Text>{`Servings: ${recipe.servings}`}</Text>
        <Text>{`Time: ${recipe.active_time}`}</Text>
      </Box> */}
    </Flex>
  );
}

export default RecipeLink;
