import {
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
    name: '',
    servings: 0,
    tags: [],
    total_time: 0,
    instructions: '',
  };

  const location = useLocation();
  const [curRecipe, setCurRecipe] = useState<recipe>(location.state as recipe ?? defaultRecipe);
  const [hours, setHours] = useState(Math.floor(curRecipe.total_time / 60));
  const [minutes, setMinutes] = useState(curRecipe.total_time % 60);
  const totalTime = (hours * 60) + minutes;

  if (!signedInUser) return <Navigate to="/login" />;
  return (
    <Fade in>
      <Flex direction={['column']}>
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
          <Flex direction="column" textAlign="left" w={['300px', '100%']}>
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
        <SubmitRecipeButton
          userId={signedInUser.uid}
          newRecipe={curRecipe}
          setSelectedRecipe={setSelectedRecipe}
          totalTime={totalTime}
        />
        )}
      </Flex>
    </Fade>
  );
}

export default AddRecipeContainer;
