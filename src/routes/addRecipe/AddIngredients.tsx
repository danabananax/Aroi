import React, { useRef, useState } from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { setRecipeProps } from '../../types';

function AddIngredients({ newRecipe, setNewRecipe }: setRecipeProps) {
  const [currIngredient, setCurrIngredient] = useState<string>('');
  const ingredientInput = useRef<HTMLInputElement>(null);
  const [currQuantity, setCurrQuantity] = useState<string>('');
  const toast = useToast();

  const handleInvalidInput = () => {
    console.log('Ingredient name field must be populated');
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
      toast({
        title: `${currIngredient} added to ingredients`,
        status: "info",
        duration: 1500,
      })
      setCurrIngredient('');
      setCurrQuantity('');
    }
    ingredientInput.current?.focus();
  };

  return (
    <AccordionItem border="none">
      <AccordionButton justifyContent="space-between">
        <Heading size="md">Add Ingredients</Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <form onSubmit={handleAddIngredient}>
          <Flex direction="column" justify="space-evenly" py={2}>
            <Input
              placeholder="Ingredient"
              onChange={(e) => setCurrIngredient(e.target.value)}
              name="ingredients"
              value={currIngredient}
              ref={ingredientInput}
              mb={2}
              size="md"
            />
            <Input
              placeholder="Quantity"
              onChange={(e) => setCurrQuantity(e.target.value)}
              name="quantity"
              value={currQuantity}
              mb={2}
              size="md"
            />
          </Flex>
          <Button type="submit" size={"sm"}>
            Add Ingredient
          </Button>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default AddIngredients;
