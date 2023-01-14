import React, { useRef, useState } from 'react';
import {
  Button,
  Flex,
  Heading, IconButton, Input, Text,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { setRecipeProps } from '../../types';

function AddIngredients({ newRecipe, setNewRecipe }: setRecipeProps) {
  const [currIngredient, setCurrIngredient] = useState<string>('');
  const ingredientInput = useRef<HTMLInputElement>(null);
  const [currQuantity, setCurrQuantity] = useState<string>('');

  const handleInvalidInput = () => {
    console.log('Ingredient name field must be populated');
  };

  const handleRemoveIngredient = (event: React.SyntheticEvent, ingredient: string) => {
    event.preventDefault();
    const ingredientList = newRecipe.ingredients;
    delete ingredientList[ingredient];
    setNewRecipe({ ...newRecipe, ingredients: ingredientList });
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
        <Flex
          direction="row"
          w="100%"
          justify="space-between"
          key={`id${Math.random().toString(16).slice(2)}`}
        >
          <Text>
            {`${ingredient} - ${newRecipe.ingredients[ingredient]}`}
          </Text>
          <IconButton
            id={ingredient}
            aria-label="Delete ingredient from list"
            icon={<DeleteIcon />}
            variant="ghost"
            onClick={(e) => { handleRemoveIngredient(e, ingredient); }}
          />
        </Flex>
      ))}
    </>
  );
}

export default AddIngredients;
