import {
  Box, Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Iuser, recipe } from '../../types';
import AddIngredients from './AddIngredients';
import AddMethod from './AddMethod';
import AddName from './AddName';

interface addRecipeProps {
  signedInUser: Iuser
}

export interface setRecipeProps {
  newRecipe: recipe
  setNewRecipe: React.Dispatch<recipe>
}

function AddRecipeContainer({ signedInUser }: addRecipeProps) {
  const defaultRecipe:recipe = {
    active_time: 'defaultTime',
    group: [''],
    ingredients: { default: 'default' },
    method: [],
    name: '',
    servings: 0,
    tags: [''],
    total_time: 'defaultTotal',
  };

  // TODO: error handling for form inputs
  // TODO: successfully submit recipe to firebase

  const [newRecipe, setNewRecipe] = useState<recipe>(defaultRecipe);
  if (!signedInUser) return <Navigate to="/login" />;
  return (
    <Box>
      <Tabs size="lg">
        <TabList>
          <Tab>Name</Tab>
          <Tab>Ingredients</Tab>
          <Tab>Method</Tab>
        </TabList>
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
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default AddRecipeContainer;
