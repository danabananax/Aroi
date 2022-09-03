import {
  Box, Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Iuser } from '../../types';
import AddIngredients from './AddIngredients';
import AddMethod from './AddMethod';
import AddName from './AddName';

interface AddRecipeProps {
  signedInUser: Iuser
}

function AddRecipeContainer({ signedInUser }: AddRecipeProps) {
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
            <AddName />
          </TabPanel>
          <TabPanel>
            <AddIngredients />
          </TabPanel>
          <TabPanel>
            <AddMethod />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default AddRecipeContainer;
