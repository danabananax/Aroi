import {
  Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs,
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

function AddRecipeContainer({ signedInUser }: signedInUserProp) {
  const defaultRecipe:recipe = {
    active_time: '',
    group: [''],
    ingredients: { },
    method: [],
    name: '',
    servings: 0,
    tags: [''],
    total_time: '',
  };

  const [newRecipe, setNewRecipe] = useState<recipe>(defaultRecipe);
  const location = useLocation();

  useEffect(() => {
    const locationState = location.state as recipe;
    console.log(locationState);
    if (locationState) {
      console.log(`Recipe exists, so we set with: ${JSON.stringify(locationState)}`);
      setNewRecipe(locationState);
    }
  }, []);

  // TODO: Update layout and UI corresponding to Figma design
  // TODO: seperate add recipe business logic and UI code
  if (!signedInUser) return <Navigate to="/login" />;
  return (
    <Flex maxW="350px" minH="200px" justify="center">
      <Tabs>
        <TabList>
          <Tab>Name</Tab>
          <Tab>Ingredients</Tab>
          <Tab>Method</Tab>
          <Tab>Extras</Tab>
        </TabList>
        <Box w="100%">
          <TabPanels>
            <TabPanel>
              <AddName newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
            </TabPanel>
            <TabPanel>
              <AddIngredients newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
            </TabPanel>
            <TabPanel>
              <AddMethod newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
            </TabPanel>
            <TabPanel>
              <AddMisc newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
            </TabPanel>
          </TabPanels>
        </Box>
        <SubmitRecipeButton userId={signedInUser.uid} newRecipe={newRecipe} />
        <BackButton />
      </Tabs>
    </Flex>
  );
}

export default AddRecipeContainer;
