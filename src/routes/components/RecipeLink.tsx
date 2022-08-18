/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import {
  Flex, Heading, Box, Text,
} from '@chakra-ui/react';
import { recipe } from '../home/HomeData';

interface RProps {
    recipe: recipe
}

function RecipeLink({ recipe }: RProps) {
  return (
    <Flex direction="row" w="400px" justify="space-between" m={2} p={4} borderRadius="9" boxShadow="md">
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
