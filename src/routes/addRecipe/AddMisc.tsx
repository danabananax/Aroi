import React from 'react';
import {
  Box,
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
    <>
      <Heading size="md" mt={4}>Add Misc</Heading>
      <Box py={2}>
        <Input
          mb={2}
          onChange={handleServingsChange}
          placeholder="Servings"
          value={(newRecipe.servings) || ''}
          size="lg"
        />
        <Input
          mb={2}
          onChange={handleActiveTimeChange}
          placeholder="Active time"
          value={newRecipe.active_time}
          size="lg"
        />
        <Input
          mb={2}
          onChange={handleTotalTimeChange}
          placeholder="Total time"
          value={newRecipe.total_time}
          size="lg"
        />
      </Box>
    </>
  );
}

export default AddMisc;
