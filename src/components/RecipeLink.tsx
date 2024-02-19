/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import {
  Heading, Box, Text, Flex, Tag, TagLabel,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { TimeIcon } from '@chakra-ui/icons';
import { RecipeLinkProps } from '../types';

function RecipeLink({ recipe, setSelectedRecipe }: RecipeLinkProps) {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setSelectedRecipe(recipe);
    navigate('/recipe');
  };

  return (
    <Flex
      as="button"
      w="16rem"
      height="12rem"
      textAlign="left"
      flexShrink={0}
      flexDirection="column"
      justify="space-between"
      my={2}
      mr={4}
      p={4}
      borderRadius="9"
      boxShadow="md"
      onClick={handleLinkClick}
    >
      <Heading size="lg">
        {recipe.name}
      </Heading>
      <Box
        overflow="clip"
        flexWrap="nowrap"
      >
        {recipe.tags.map((tag) => (
          <Tag
            size="sm"
            key={tag}
            borderRadius="full"
            variant="subtle"
            colorScheme="pink"
            mr={2}
            my={1}
          >
            <TagLabel>{tag.charAt(0).toUpperCase() + tag.slice(1)}</TagLabel>
          </Tag>
        ))}
      </Box>
      <Box>
        <Flex flexDirection="row">
          <Text>{`${recipe.servings} Servings`}</Text>
          <Flex flexDirection="row" align="center" pl={4}>
            <TimeIcon />
            <Text pl={2}>
              {
                recipe.total_time < 60
                  ? `${recipe.total_time} mins`
                  : `${Math.floor(recipe.total_time / 60)}h ${recipe.total_time % 60}m`
              }
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export default RecipeLink;
