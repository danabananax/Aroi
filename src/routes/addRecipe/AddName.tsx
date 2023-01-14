import React from 'react';
import { Box, Heading, Input } from '@chakra-ui/react';
import { setRecipeProps } from '../../types';

function AddName({ newRecipe, setNewRecipe }: setRecipeProps) {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewRecipe({ ...newRecipe, name: value });
  };

  return (
    <>
      <Heading>Add name</Heading>
      <Box py={2}>
        <Input
          onChange={handleNameChange}
          placeholder="Recipe name"
          value={newRecipe.name}
        />
      </Box>
    </>
  );
}

export default AddName;
