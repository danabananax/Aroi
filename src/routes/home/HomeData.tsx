import React, { useEffect, useState } from 'react';
import {
  Box, Skeleton, Text,
} from '@chakra-ui/react';
import {
  collection, getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase';
import RecipeLink from '../components/RecipeLink';
import { recipe } from '../../types';

interface HomeDataProps {
    userId: string
    setSelectedRecipe: React.Dispatch<recipe>
}

function HomeData({ userId, setSelectedRecipe }: HomeDataProps) {
  const [userRecipes, setUserRecipes] = useState<recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  /**
   * Updates state with list of recipes authored by user
   * @throws console log of error if current user is not defined
   */
  const getRecipes = async () => {
    setLoadingRecipes(true);
    try {
      const userRecipesCollectionRef = collection(db, 'users', userId, 'recipes');
      const userRecipesSnapshot = await getDocs(userRecipesCollectionRef);
      setUserRecipes(
        userRecipesSnapshot.docs.map(
          (recipeSnapshot) => ({ ...recipeSnapshot.data(), id: recipeSnapshot.id } as recipe),
        ),
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecipes().then(() => {
      setLoadingRecipes(false);
    });
  }, []);
  // TODO: Implement fade-in for dynamic data
  return (
    <Box>
      <Skeleton isLoaded={!loadingRecipes}>
        {!loadingRecipes && Object.keys(userRecipes).length !== 0
        && userRecipes.map((recipe: recipe) => (
          <RecipeLink
            recipe={recipe}
            setSelectedRecipe={setSelectedRecipe}
            key={`id${Math.random().toString(16).slice(2)}`}
          />
        ))}
        {!loadingRecipes
        && userRecipes.length < 1
        && <Text fontSize="4xl">No recipes to display, click &apos;Add Recipe&apos;.</Text>}
      </Skeleton>
    </Box>
  );
}

export default HomeData;
