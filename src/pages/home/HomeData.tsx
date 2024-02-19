import React, { useEffect, useState } from 'react';
import {
  Box, Fade, Flex, Heading, Input, Select, Spinner, Text,
} from '@chakra-ui/react';
import {
  collection, getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { recipe } from '../../types';
import RecipeLink from '../../components/RecipeLink';

interface HomeDataProps {
    userId: string | undefined
    setSelectedRecipe: React.Dispatch<recipe>
}

function HomeData({ userId, setSelectedRecipe }: HomeDataProps) {
  const [userRecipes, setUserRecipes] = useState<recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const [sortBy, setSortBy] = useState<string | null>();
  const [searchString, setSearchString] = useState<string>('');

  const getRecipes = async () => {
    setLoadingRecipes(true);
    try {
      if (!userId) throw Error('No user');
      const userRecipesCollectionRef = collection(db, 'users', userId, 'recipes');
      const userRecipesSnapshot = await getDocs(userRecipesCollectionRef);
      const updatedRecipesList = userRecipesSnapshot.docs.map((recipeSnapshot) => (
        { ...recipeSnapshot.data(), id: recipeSnapshot.id } as recipe
      ));
      setUserRecipes(updatedRecipesList);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingRecipes(false);
    }
  };

  const searchNameAndTagFilter = (recipe: recipe) => (
    recipe.name.toLowerCase().includes(searchString.toLowerCase())
    || recipe.tags.join('').toLowerCase().includes(searchString.toLowerCase())
  );

  useEffect(() => {
    getRecipes().then(() => {
      setLoadingRecipes(false);
    });
  }, []);

  if (loadingRecipes) {
    return (
      <Box m={6}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (userRecipes.length < 1) {
    return (
      <Fade in>
        <Box>
          <Text fontSize="4xl">No recipes to display, click &apos;Add Recipe&apos;.</Text>
        </Box>
      </Fade>
    );
  }

  return (
    <Fade in>
      <Box width="100%">
        <Box py={2} w={['100%', '100%', '400px']}>
          <Input
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
            placeholder="Search recipes or tags"
            value={searchString}
            size="md"
            my={2}
          />
          <Select
            placeholder="Sort by"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="servings">Servings</option>
            <option value="total_time">Total time</option>
          </Select>
        </Box>
        <Heading pt={8} textAlign="left">All Recipes</Heading>
        <Flex
          pt={4}
          overflowX="scroll"
          direction="row"
          flexWrap="nowrap"
          shrink={0}
        >
          {sortBy == null
            ? userRecipes
              .filter(searchNameAndTagFilter)
              .map((recipe: recipe) => (
                <RecipeLink
                  recipe={recipe}
                  setSelectedRecipe={setSelectedRecipe}
                  key={`id${Math.random().toString(16).slice(2)}`}
                />
              ))
            : userRecipes
              .filter(searchNameAndTagFilter)
              .sort((a, b) => (sortBy === 'servings'
                ? b.servings - a.servings
                : b.total_time - a.total_time))
              .map((recipe: recipe) => (
                <RecipeLink
                  recipe={recipe}
                  setSelectedRecipe={setSelectedRecipe}
                  key={`id${Math.random().toString(16).slice(2)}`}
                />
              ))}
        </Flex>
      </Box>
    </Fade>
  );
}

export default HomeData;
