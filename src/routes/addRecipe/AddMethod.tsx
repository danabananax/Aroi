import React, { useState } from 'react';
import { Box, Heading, Input } from '@chakra-ui/react';
import { setRecipeProps } from './AddRecipeContainer';

function AddMethod({ newRecipe, setNewRecipe }: setRecipeProps) {
  const [currStep, setCurrStep] = useState<string>('');

  const handleAddStep = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setNewRecipe({
      ...newRecipe,
      method: [...newRecipe.method, currStep],
    });
  };

  return (
    <Box>
      <Heading>Add name</Heading>
      <form onSubmit={handleAddStep}>
        <Input
          onChange={(e) => setCurrStep(e.target.value)}
          placeholder="Recipe name"
          value={currStep}
        />
      </form>
    </Box>
  );
}

export default AddMethod;
