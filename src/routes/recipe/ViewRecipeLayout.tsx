import React from 'react';
import {
  Box, Flex, Heading, Text,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { ViewRecipeProps } from '../../types';
import EditRecipeButton from '../components/EditRecipeButton';
import DeleteRecipeButton from '../components/DeleteRecipeButton';

function ViewRecipeLayout({ signedInUser, selectedRecipe }: ViewRecipeProps) {
  const userId = signedInUser?.uid;

  // TODO: Implement desktop layout corresponding to design on Figma
  return userId && selectedRecipe ? (
    <Box width="100vw" px={32}>
      <Flex direction="row" justifyContent="space-between" width="100%" mb={8}>
        <BackButton />
        <EditRecipeButton recipe={selectedRecipe} />
        <DeleteRecipeButton keyToDelete={selectedRecipe.id} userId={userId} />
      </Flex>
      <Heading textAlign="left" size="3xl">{selectedRecipe.name}</Heading>
      <Flex textAlign="left" direction="row" justifyContent="space-between" width="100%" py={8}>
        <Box width="35%">
          {Object.keys(selectedRecipe.ingredients).map((key) => (
            <Flex
              justify="space-between"
              w="100%"
              key={`id${Math.random().toString(16).slice(2)}`}
              mb={2}
            >
              <Text fontSize={20}>{key}</Text>
              <Text fontSize={20}>{selectedRecipe.ingredients[key]}</Text>
            </Flex>
          ))}
        </Box>
        <Box width="30%">
          {selectedRecipe.method.map((method, idx) => (
            <Text fontSize={20} mb={2} key={`id${Math.random().toString(16).slice(2)}`}>
              {`${idx + 1}. ${method}`}
            </Text>
          ))}
        </Box>
      </Flex>
    </Box>
  )
    : <Navigate to="/login" />;
}

export default ViewRecipeLayout;
