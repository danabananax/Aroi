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
    <>
      <Flex direction={"row"} justify={"space-between"}>
        <Input
          onChange={handleServingsChange}
          placeholder="Servings"
          value={(curRecipe.servings) || ''}
          size="md"
          mr={2}
        />
        <Input
          onChange={handleTotalTimeChange}
          placeholder="Time"
          value={curRecipe.total_time}
          size="md"
          ml={2}
        />
      </Flex>
    </>
  );
}

export default AddMisc;
