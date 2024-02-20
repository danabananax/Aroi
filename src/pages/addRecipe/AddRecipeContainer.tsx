import {
  Box,
  Center, Fade, Flex,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import SubmitRecipeButton from '../../components/SubmitRecipeButton';
import { recipe, addRecipeContainerProps } from '../../types';
import AddName from './AddName';
import RecipeEditor from './Editor/RecipeEditor';
import AddTag from './AddTag';
import TagDisplay from './TagDisplay';
import AddMisc from './AddMisc';
import AddRecipeFromLinkBtn from '../../components/AddRecipeFromLinkBtn';

function AddRecipeContainer({ signedInUser, setSelectedRecipe }: addRecipeContainerProps) {
  const defaultRecipe:recipe = {
    id: '',
    name: '',
    servings: 0,
    tags: [],
    total_time: 0,
    instructions: '',
    favourite: false,
  };

  const location = useLocation();
  const [curRecipe, setCurRecipe] = useState<recipe>(location.state as recipe ?? defaultRecipe);
  const [hours, setHours] = useState(Math.floor(curRecipe.total_time / 60));
  const [minutes, setMinutes] = useState(curRecipe.total_time % 60);
  const totalTime = (hours * 60) + minutes;

  if (!signedInUser) return <Navigate to="/login" />;
  return (
    <Fade in>
      <Box minW={['390px', '900px']} maxW="1000px" px={[6, 2]}>
        <Flex direction={['column']} width="100%">
          <Flex
            textAlign="left"
            mb={[14, 6]}
            direction="row"
            justifyContent="space-between"
          >
            <BackButton />
            <AddRecipeFromLinkBtn userId={signedInUser.uid} />
          </Flex>
          <Center>
            <Flex direction="column" textAlign="left">
              <AddName curRecipe={curRecipe} setCurRecipe={setCurRecipe} />
              <AddMisc
                curRecipe={curRecipe}
                setCurRecipe={setCurRecipe}
                hours={hours}
                minutes={minutes}
                setMinutes={setMinutes}
                setHours={setHours}
              />
              <AddTag curRecipe={curRecipe} setCurRecipe={setCurRecipe} />
              <TagDisplay curRecipe={curRecipe} setCurRecipe={setCurRecipe} />
              <RecipeEditor curRecipe={curRecipe} setCurRecipe={setCurRecipe} />
            </Flex>
          </Center>
          {setSelectedRecipe !== undefined
        && (
          <Box>
            <SubmitRecipeButton
              userId={signedInUser.uid}
              newRecipe={curRecipe}
              setSelectedRecipe={setSelectedRecipe}
              totalTime={totalTime}
            />
          </Box>
        )}
        </Flex>
      </Box>
    </Fade>
  );
}

export default AddRecipeContainer;
