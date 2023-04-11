import {
  Box, Flex, Heading, Text,
} from '@chakra-ui/react';
import React from 'react';
import { setRecipeProps } from '../../types';
import DeletableEntry from './DeletableEntry';

function RecipeTempView({ newRecipe, setNewRecipe }: setRecipeProps) {
  const handleRemoveIngredient = (event: React.SyntheticEvent, ingredient: string) => {
    event.preventDefault();
    const ingredientList = newRecipe.ingredients;
    delete ingredientList[ingredient];
    setNewRecipe({ ...newRecipe, ingredients: ingredientList });
  };

  const handleRemoveStep = (event: React.SyntheticEvent, stepToRemove: string) => {
    event.preventDefault();
    const newMethod = newRecipe.method.filter((step) => step !== stepToRemove);
    setNewRecipe({ ...newRecipe, method: newMethod });
  };

  return (
    <Box maxW="500" ml={16}>
      <Flex mb={6} justify="space-between">
        <Heading>{newRecipe.name}</Heading>
        <Box ml={4} mt={2} minW="100px" minH="50px">
          {newRecipe.servings > 0 && (
          <Text fontSize={11} size="sm" textAlign="right">
            Servings:
            {' '}
            {newRecipe.servings}
          </Text>
          )}
          {newRecipe.active_time && (
          <Text fontSize={11} size="sm" textAlign="right">
            Active time:
            {' '}
            {newRecipe.active_time}
          </Text>
          )}
          {newRecipe.total_time && (
          <Text fontSize={11} textAlign="right">
            Total time:
            {' '}
            {newRecipe.total_time}
          </Text>
          )}
        </Box>
      </Flex>
      {Object.keys(newRecipe.ingredients).map((ingredient) => (
        <DeletableEntry
          identifier={ingredient}
          textContent={`${ingredient} - ${newRecipe.ingredients[ingredient]}`}
          deleteFunction={handleRemoveIngredient}
        />
      ))}
      <Box mt={6} />
      {newRecipe.method.map((methodStep, idx) => (
        <DeletableEntry
          identifier={methodStep}
          textContent={`${idx + 1}. ${methodStep}`}
          deleteFunction={handleRemoveStep}
        />
      ))}
    </Box>
  );
}

export default RecipeTempView;
