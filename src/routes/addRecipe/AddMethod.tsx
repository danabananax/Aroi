import React, { useRef, useState } from 'react';
import {
  Box,
  Button, Heading, Input,
} from '@chakra-ui/react';
import { setRecipeProps } from '../../types';

function AddMethod({ newRecipe, setNewRecipe }: setRecipeProps) {
  const [currStep, setCurrStep] = useState<string>('');
  const methodInput = useRef<HTMLInputElement>(null);

  const handleAddStep = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(newRecipe);
    setNewRecipe({
      ...newRecipe,
      method: [...newRecipe.method, currStep],
    });
    setCurrStep('');
    methodInput.current?.focus();
  };

  return (
    <>
      <Heading size="md" mt={3}>Add Method</Heading>
      <form onSubmit={handleAddStep}>
        <Box py={2}>
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
    </>
  );
}

export default AddMethod;
