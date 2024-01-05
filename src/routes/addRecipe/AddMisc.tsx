import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading, Input,
} from '@chakra-ui/react';
import { setRecipeProps } from '../../types';

function AddMisc({ curRecipe, setCurRecipe }: setRecipeProps) {
  const handleServingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCurRecipe({ ...curRecipe, servings: parseInt(value, 10) });
  };

  const handleTotalTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCurRecipe({ ...curRecipe, total_time: value });
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
            value={(curRecipe.servings) || ''}
            size="md"
          />
          <Input
            mb={2}
            onChange={handleTotalTimeChange}
            placeholder="Total time"
            value={curRecipe.total_time}
            size="md"
          />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default AddMisc;
