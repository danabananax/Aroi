import { Box, Heading, Text } from '@chakra-ui/react';
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
    <Box w="400px">
      <Heading mb={6}>{newRecipe.name}</Heading>

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
      {newRecipe.servings > 0 && (
      <Text mt={6}>
        Servings:
        {' '}
        {newRecipe.servings}
      </Text>
      )}
      {newRecipe.active_time && (
      <Text mt={2}>
        Active time:
        {' '}
        {newRecipe.active_time}
      </Text>
      )}
      {newRecipe.total_time && (
      <Text mt={2}>
        Total time:
        {' '}
        {newRecipe.total_time}
      </Text>
      )}
    </Box>
  );
}

export default RecipeTempView;
