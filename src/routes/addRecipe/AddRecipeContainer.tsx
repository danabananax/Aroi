import {
  Accordion,
  Box, Center, Fade, Flex,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import SubmitRecipeButton from '../../components/SubmitRecipeButton';
import { recipe, addRecipeContainerProps } from '../../types';
import AddName from './AddName';
import RecipeEditor from '../../components/Editor/RecipeEditor';
import AddTag from './AddTag';
import TagDisplay from './TagDisplay';

function AddRecipeContainer({ signedInUser, setSelectedRecipe }: addRecipeContainerProps) {
  const defaultRecipe:recipe = {
    name: '',
    servings: 0,
    tags: [],
    total_time: '',
    instructions: "",
  };
  
  const location = useLocation();
  const [curRecipe, setCurRecipe] = useState<recipe>(location.state as recipe ?? defaultRecipe);

  if (!signedInUser) return <Navigate to="/login" />;
  return (
    <Fade in>
      <Flex direction={["column"]}>
        <Box
          textAlign={"left"}
          mb={[8, 0]}
          flex={1}
        >
          <Box mb={6}>
            <BackButton />
          </Box>
        </Box>
        <Center>
          <Flex direction={"column"} textAlign={"left"}>
            <AddName curRecipe={curRecipe} setCurRecipe={setCurRecipe} />
            <AddTag curRecipe={curRecipe} setCurRecipe={setCurRecipe}/>
            <TagDisplay curRecipe={curRecipe} setCurRecipe={setCurRecipe} />
            <RecipeEditor curRecipe={curRecipe} setCurRecipe={setCurRecipe}/>
          </Flex>
        </Center>
        {setSelectedRecipe !== undefined
        && (
        <SubmitRecipeButton
          userId={signedInUser.uid}
          newRecipe={curRecipe}
          setSelectedRecipe={setSelectedRecipe}
        />
        )}
      </Flex>
    </Fade>
  );
}

export default AddRecipeContainer;
