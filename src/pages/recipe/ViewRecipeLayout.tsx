import React from 'react';
import {
  Box, Fade, Flex, Heading, Tag, TagLabel, Text,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { ViewRecipeProps } from '../../types';
import DeleteRecipeButton from '../../components/DeleteRecipeButton';
import parse from 'html-react-parser';
import '../../components/Editor/styles.scss';
import EditRecipeButton from '../../components/EditRecipeButton';

function ViewRecipeLayout({ signedInUser, selectedRecipe }: ViewRecipeProps) {
  const userId = signedInUser?.uid;

  console.log(selectedRecipe?.instructions);

  return userId && selectedRecipe ? (
    <Fade in>
      <Box minW={["390px", "900px"]} px={[6, 0]}>
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
          <Box maxW="500px" textAlign="right" mt={2}>
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
            <Text pt={2}>Serves {selectedRecipe.servings}</Text>
            <Text>{selectedRecipe.total_time}</Text>
          </Box>
        </Flex>
        <Flex textAlign="left" direction={["column"]} width="100%" pt={4}>
          {parse(selectedRecipe.instructions)}
        </Flex>
      </Box>
    </Fade>
  )
    : <Navigate to="/login" />;
}

export default ViewRecipeLayout;
