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
    <Box textAlign="left" width="100%" py={2}>
      <Input
        onChange={handleNameChange}
        placeholder="Recipe name"
        value={newRecipe.name}
        size="md"
      />
    </Box>
  );
}

export default AddName;
