import React, { useEffect, useState } from 'react';
import {
  Box, Skeleton,
} from '@chakra-ui/react';
import {
  doc, getDoc,
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

  const getRecipes = async () => {
    try {
      const userRecipesCollectionRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRecipesCollectionRef);
      const userData = userDoc.data();
      if (userData) {
        const recipeMap : Map<string, recipe> = userData.recipes;
        const recipeList : recipe[] = Object.values(recipeMap);
        setUserRecipes(recipeList);
      } else throw new Error('No recipes');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecipes().then(() => {
      setLoadingRecipes(false);
    });
  }, []);

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
      </Skeleton>
    </Box>
  );
}

export default HomeData;
