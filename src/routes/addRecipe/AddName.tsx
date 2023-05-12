import React from 'react';
import {
  AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, Input,
} from '@chakra-ui/react';
import { setRecipeProps } from '../../types';

function AddName({ newRecipe, setNewRecipe }: setRecipeProps) {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewRecipe({ ...newRecipe, name: value });
  };

  return (
    <AccordionItem border="none">
      <AccordionButton justifyContent="space-between">
        <Heading size="md">Recipe Name</Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Box textAlign="left" width="100%">
          <Input
            onChange={handleNameChange}
            placeholder="Recipe name"
            value={newRecipe.name}
            size="md"
          />
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default AddName;
