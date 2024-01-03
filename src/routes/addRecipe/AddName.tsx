import React from 'react';
import {
  Box, Input,
} from '@chakra-ui/react';
import { setRecipeProps } from '../../types';

function AddName({ curRecipe, setCurRecipe }: setRecipeProps) {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCurRecipe({ ...curRecipe, name: value });
  };

  return (
    <Box textAlign="left" width="100%" py={2}>
      <Input
        onChange={handleNameChange}
        placeholder="Recipe name"
        value={curRecipe.name}
        size="md"
      />
    </Box>
  );
}

export default AddName;
