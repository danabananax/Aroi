import React, { useState } from 'react';
import {
  Box, FormControl, Heading, Input,
} from '@chakra-ui/react';
import { setRecipeProps } from './AddRecipeContainer';

function AddIngredients({ newRecipe, setNewRecipe }: setRecipeProps) {
  const [currIngredient, setCurrIngredient] = useState<string>('');
  const [currQuantity, setCurrQuantity] = useState<string>('');

  const handleAddIngredient = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (currIngredient) {
      setNewRecipe({
        ...newRecipe,
        ingredients: {
          ...newRecipe.ingredients,
          currIngredient: currQuantity,
        },
      });
    }
  };

  return (
    <Box>
      <Heading>Add Ingredients</Heading>
      <form onSubmit={handleAddIngredient}>
        <FormControl>
          <Input
            placeholder="Ingredient"
            onChange={(e) => setCurrIngredient(e.target.value)}
            value={currIngredient}
            isRequired
          />
        </FormControl>
        <FormControl>
          <Input
            placeholder="Quantity"
            onChange={(e) => setCurrQuantity(e.target.value)}
            value={currQuantity}
          />
        </FormControl>
      </form>
    </Box>
  );
}

export default AddIngredients;
