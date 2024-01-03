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
    instructions: "<p>default recipe start</p>",
  };

  const [curRecipe, setCurRecipe] = useState<recipe>(defaultRecipe);

  // Grabbing recipe from location from edit button with useNavigate
  const location = useLocation();
  useEffect(() => {
    const recipe = location.state as recipe;
    if (recipe) {
      setCurRecipe(recipe);
    }
  }, []);

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
            <AddName newRecipe={curRecipe} setNewRecipe={setCurRecipe} />
            <AddTag newRecipe={curRecipe} setNewRecipe={setCurRecipe}/>
            <TagDisplay newRecipe={curRecipe} setNewRecipe={setCurRecipe} />
            <RecipeEditor editorContent={curRecipe.instructions} curRecipe={curRecipe} setRecipe={setCurRecipe}/>
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
