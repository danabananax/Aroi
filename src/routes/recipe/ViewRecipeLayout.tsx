import React from 'react';
import {
  Box, Fade, Flex, Heading, Tag, TagLabel, Text,
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
    <Fade in>
      <Box width="1000px">
        <Flex direction="row" justifyContent="space-between" width="100%" mb={8}>
          <BackButton />
          <EditRecipeButton recipe={selectedRecipe} />
          <DeleteRecipeButton
            keyToDelete={selectedRecipe.id}
            recipeName={selectedRecipe.name}
            userId={userId}
          />
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Heading textAlign="left" size="2xl">{selectedRecipe.name}</Heading>
          <Box maxW="200px" textAlign="right" mt={2}>
            {selectedRecipe.tags.map((tag) => (
              <Tag
                size="md"
                key={tag}
                borderRadius="full"
                variant="subtle"
                colorScheme="pink"
                mb={2}
                mr={2}
              >
                <TagLabel>{tag.charAt(0).toUpperCase() + tag.slice(1)}</TagLabel>
              </Tag>
            ))}
          </Box>
        </Flex>
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
          <Box maxWidth="50%">
            {selectedRecipe.method.map((method, idx) => (
              <Text fontSize={16} mb={2} key={`id${Math.random().toString(16).slice(2)}`}>
                {`${idx + 1}. ${method}`}
              </Text>
            ))}
          </Box>
        </Flex>
      </Box>
    </Fade>
  )
    : <Navigate to="/login" />;
}

export default ViewRecipeLayout;
