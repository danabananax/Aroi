import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading, Input,
} from '@chakra-ui/react';
import { setRecipeProps } from '../../types';

function AddMisc({ newRecipe, setNewRecipe }: setRecipeProps) {
  const handleServingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewRecipe({ ...newRecipe, servings: parseInt(value, 10) });
  };

  const handleActiveTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewRecipe({ ...newRecipe, active_time: value });
  };

  const handleTotalTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewRecipe({ ...newRecipe, total_time: value });
  };

  return (
    <AccordionItem border="none">
      <AccordionButton justifyContent="space-between">
        <Heading size="md">Recipe Info</Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Flex direction={"column"} justify="space-evenly" py={2}>
          <Input
            mb={2}
            onChange={handleServingsChange}
            placeholder="Servings"
            value={(newRecipe.servings) || ''}
            size="md"
          />
          <Input
            mb={2}
            onChange={handleActiveTimeChange}
            placeholder="Active time"
            value={newRecipe.active_time}
            size="md"
          />
          <Input
            mb={2}
            onChange={handleTotalTimeChange}
            placeholder="Total time"
            value={newRecipe.total_time}
            size="md"
          />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default AddMisc;
