import React, { useRef, useState } from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button, Heading, Input,
} from '@chakra-ui/react';
import { setRecipeProps } from '../../types';

function AddMethod({ newRecipe, setNewRecipe }: setRecipeProps) {
  const [currStep, setCurrStep] = useState<string>('');
  const methodInput = useRef<HTMLInputElement>(null);

  const handleAddStep = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setNewRecipe({
      ...newRecipe,
      method: [...newRecipe.method, currStep],
    });
    setCurrStep('');
    methodInput.current?.focus();
  };

  return (
    <AccordionItem border="none">
      <AccordionButton>
        <Heading size="md">Add Method</Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <form onSubmit={handleAddStep}>
          <Box>
            <Input
              onChange={(e) => setCurrStep(e.target.value)}
              placeholder="Method step"
              value={currStep}
              ref={methodInput}
              size="md"
            />
          </Box>
          <Button type="submit" display="none" />
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default AddMethod;
