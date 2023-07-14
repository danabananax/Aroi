import {
  Box, Flex, Heading, Tag, TagCloseButton, TagLabel, Text,
} from '@chakra-ui/react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { setRecipeProps } from '../../types';
import DeletableEntry from './DeletableEntry';

function RecipeTempView({ newRecipe, setNewRecipe }: setRecipeProps) {
  const handleRemoveIngredient = (event: React.SyntheticEvent, ingredient: string) => {
    event.preventDefault();
    const ingredientList = newRecipe.ingredients;
    delete ingredientList[ingredient];
    setNewRecipe({ ...newRecipe, ingredients: ingredientList });
  };

  const handleRemoveStep = (event: React.SyntheticEvent, stepToRemove: string) => {
    event.preventDefault();
    const newMethod = newRecipe.method.filter((step) => step !== stepToRemove);
    setNewRecipe({ ...newRecipe, method: newMethod });
  };

  const handleRemoveTag = (event: React.SyntheticEvent, tagToRemove: string) => {
    event.preventDefault();
    const newTags = newRecipe.tags.filter((tag) => tag !== tagToRemove);
    setNewRecipe({ ...newRecipe, tags: newTags });
  };

  return (
    <Box maxW="500" ml={[0, 16]} p={[4, 0]}>
      <Flex mb={4} justify={["space-between"]} textAlign={["left", "inherit"]}>
        <Heading >{newRecipe.name}</Heading>
        <Box ml={4} mt={[0, 3]} minW="100px" minH="50px">
          {newRecipe.servings > 0 && (
          <Text fontSize={11} size="sm" textAlign="right">
            Servings:
            {' '}
            {newRecipe.servings}
          </Text>
          )}
          {newRecipe.active_time && (
          <Text fontSize={11} size="sm" textAlign="right">
            Active time:
            {' '}
            {newRecipe.active_time}
          </Text>
          )}
          {newRecipe.total_time && (
          <Text fontSize={11} textAlign="right">
            Total time:
            {' '}
            {newRecipe.total_time}
          </Text>
          )}
        </Box>
      </Flex>
      <Flex
        alignItems="flex-start"
        justifyContent="flex-start"
        textAlign="left"
        wrap="wrap"
        mb={4}
      >
        {newRecipe.tags.map((tag) => (
          <Tag
            size="sm"
            key={uuidv4()}
            borderRadius="full"
            variant="subtle"
            colorScheme="pink"
            mb={2}
            mr={2}
          >
            <TagLabel>{tag.charAt(0).toUpperCase() + tag.slice(1)}</TagLabel>
            <TagCloseButton onClick={(e) => handleRemoveTag(e, tag)} />
          </Tag>
        ))}
      </Flex>
      {Object.keys(newRecipe.ingredients).map((ingredient) => (
        <DeletableEntry
          identifier={ingredient}
          textContent={`${ingredient} - ${newRecipe.ingredients[ingredient]}`}
          deleteFunction={handleRemoveIngredient}
        />
      ))}
      <Box mt={6} />
      {newRecipe.method.map((methodStep, idx) => (
        <DeletableEntry
          identifier={methodStep}
          textContent={`${idx + 1}. ${methodStep}`}
          deleteFunction={handleRemoveStep}
        />
      ))}
    </Box>
  );
}

export default RecipeTempView;
