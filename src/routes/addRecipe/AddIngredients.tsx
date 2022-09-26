import React, { useRef, useState } from 'react';
import {
  Button,
  Heading, Input, Text,
} from '@chakra-ui/react';
import { setRecipeProps } from '../../types';

function AddIngredients({ newRecipe, setNewRecipe }: setRecipeProps) {
  const [currIngredient, setCurrIngredient] = useState<string>('');
  const ingredientInput = useRef<HTMLInputElement>(null);
  const [currQuantity, setCurrQuantity] = useState<string>('');

  const handleInvalidInput = () => {
    console.log('Ingredients field must be populated');
  };

  const handleAddIngredient = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!currIngredient) {
      handleInvalidInput();
    } else {
      setNewRecipe({
        ...newRecipe,
        ingredients: {
          ...newRecipe.ingredients,
          [currIngredient]: currQuantity || '',
        },
      });
      setCurrIngredient('');
      setCurrQuantity('');
    }
    ingredientInput.current?.focus();
  };

  return (
    <>
      <Heading>Add Ingredients</Heading>
      <form onSubmit={handleAddIngredient}>
        <Input
          placeholder="Ingredient"
          onChange={(e) => setCurrIngredient(e.target.value)}
          name="ingredients"
          value={currIngredient}
          ref={ingredientInput}
        />
        <Input
          placeholder="Quantity"
          onChange={(e) => setCurrQuantity(e.target.value)}
          name="quantity"
          value={currQuantity}
        />
        <Button type="submit" display="none" />
      </form>
      {Object.keys(newRecipe.ingredients).map((ingredient) => (
        <Text key={`id${Math.random().toString(16).slice(2)}`}>
          {ingredient}
          {' '}
          -
          {' '}
          {newRecipe.ingredients[ingredient]}
        </Text>
      ))}
    </>
  );
}

export default AddIngredients;
