import {
  Box, Fade, Flex,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import SubmitRecipeButton from '../../components/SubmitRecipeButton';
import { recipe, signedInUserProp } from '../../types';
import AddIngredients from './AddIngredients';
import AddMethod from './AddMethod';
import AddMisc from './AddMisc';
import AddName from './AddName';
import RecipeTempView from './RecipeTempView';
import AddTag from './AddTag';

function AddRecipeContainer({ signedInUser }: signedInUserProp) {
  const defaultRecipe:recipe = {
    active_time: '',
    group: [''],
    ingredients: { },
    method: [],
    name: '',
    servings: 0,
    tags: [],
    total_time: '',
  };

  const [newRecipe, setNewRecipe] = useState<recipe>(defaultRecipe);
  const location = useLocation();

  // Works to inject an existing recipe via edit button
  useEffect(() => {
    const locationState = location.state as recipe;
    if (locationState) {
      setNewRecipe(locationState);
    }
  }, []);

  if (!signedInUser) return <Navigate to="/login" />;
  return (
    <Fade in>
      <Flex
        width="70vw"
        direction="row"
        align="flex-start"
        justify="space-between"
      >
        <Box
          textAlign="left"
          width="300px"
        >
          <BackButton />
          <AddName newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
          <AddMisc newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
          <AddTag newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
          <AddIngredients newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
          <AddMethod newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
          <SubmitRecipeButton userId={signedInUser.uid} newRecipe={newRecipe} />
        </Box>
        <Box>
          <RecipeTempView newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
        </Box>
      </Flex>
    </Fade>
  );
}

export default AddRecipeContainer;
