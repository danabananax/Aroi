import React from 'react';
import {
  Box,
  Fade,
  Flex,
  Heading,
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import parse from 'html-react-parser';
import BackButton from '../../components/BackButton';
import { ViewRecipeProps } from '../../types';
import DeleteRecipeButton from '../../components/DeleteRecipeButton';
import '../addRecipe/Editor/styles.scss';
import EditRecipeButton from '../../components/EditRecipeButton';
import EncodeAndCopyRecipeBtn from '../../components/EncodeAndCopyRecipeBtn';
import AddFavsBar from '../addRecipe/Editor/AddFavsBar';
import DisplayNutrition from '../../components/DisplayNutrition';

function ViewRecipeLayout({ signedInUser, selectedRecipe }: ViewRecipeProps) {
  const userId = signedInUser?.uid;

  return userId && selectedRecipe ? (
    <Fade in>
      <Box minW={['390px', '900px']} maxW="1000px" px={[6, 2]}>
        <Flex
          direction="row"
          justifyContent="space-between"
          width="100%"
          mb={4}
        >
          <BackButton />
          <EditRecipeButton recipe={selectedRecipe} />
          <Box>
            <EncodeAndCopyRecipeBtn recipe={selectedRecipe} />
            <DeleteRecipeButton
              keyToDelete={selectedRecipe.id}
              recipeName={selectedRecipe.name}
              userId={userId}
            />
          </Box>
        </Flex>
        <AddFavsBar userId={userId} recipe={selectedRecipe} />
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Heading textAlign="left" size="2xl">
            {selectedRecipe.name}
          </Heading>
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
                <TagLabel>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </TagLabel>
              </Tag>
            ))}
            <Text pt={2}>
              Serves
              {` ${selectedRecipe.servings}`}
            </Text>
            <Text>
              {selectedRecipe.total_time < 60
                ? `${selectedRecipe.total_time} minutes`
                : `${Math.floor(selectedRecipe.total_time / 60)}h, ${
                  selectedRecipe.total_time % 60
                } mins`}
            </Text>
          </Box>
        </Flex>
        <Flex direction={['column', 'row']}>
          <Flex textAlign="left" flex={3} direction={['column']} pt={4}>
            {parse(selectedRecipe.instructions)}
          </Flex>
          { selectedRecipe.nutrition
            && (
            <Flex textAlign="left" flex={1} direction={['column']} pt={4}>
              <Text fontSize={24}>Nutrition</Text>
              <DisplayNutrition nutrition={selectedRecipe.nutrition} />
            </Flex>
            )}
        </Flex>
      </Box>
    </Fade>
  ) : (
    <Navigate to="/login" />
  );
}

export default ViewRecipeLayout;
