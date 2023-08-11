import {
  Accordion,
  Box, Center, Fade, Flex,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import SubmitRecipeButton from '../../components/SubmitRecipeButton';
import { recipe, addRecipeContainerProps } from '../../types';
import AddIngredients from './AddIngredients';
import AddMethod from './AddMethod';
import AddMisc from './AddMisc';
import AddName from './AddName';
import RecipeTempView from './RecipeTempView';
import AddTag from './AddTag';

function AddRecipeContainer({ signedInUser, setSelectedRecipe }: addRecipeContainerProps) {
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
        p={0}
        direction={["column", "row"]}
        align={["flex-start"]}
        justify={"space-between"}
      >
        <Box
          textAlign={"left"}
          mb={[8, 0]}
          flex={1}
        >
          <Box ml={2} mb={6}>
            <BackButton />
          </Box>
          <Accordion allowToggle allowMultiple w={["390px", "300px"]}>
            <AddName newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
            <AddMisc newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
            <AddTag newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
            <AddIngredients newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
            <AddMethod newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
          </Accordion>
          {setSelectedRecipe !== undefined
          && (
          <SubmitRecipeButton
            userId={signedInUser.uid}
            newRecipe={newRecipe}
            setSelectedRecipe={setSelectedRecipe}
          />
          )}
        </Box>
        <RecipeTempView newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
      </Flex>
    </Fade>
  );
}

export default AddRecipeContainer;
