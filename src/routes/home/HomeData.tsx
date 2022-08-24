import React, { useEffect, useState } from 'react';
import {
  Box, Skeleton, Text,
} from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import RecipeLink from '../components/RecipeLink';

export interface recipe {
    active_time: string
    group: Array<string>
    ingredients: Record<string, string>
    method: Array<string>
    name: string
    servings: number
    tags: Array<string>
    total_time: string
}

interface HomeDataProps {
    userId: string
    setSelectedRecipe: React.Dispatch<recipe>
}

function HomeData({ userId, setSelectedRecipe }: HomeDataProps) {
  const [userRecipes, setUserRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  const getRecipes = async () => {
    try {
      const userRecipesDoc = doc(db, 'users', userId);
      const userDoc = await getDoc(userRecipesDoc);
      await setUserRecipes(userDoc.data()?.recipes);
      console.log(userRecipes);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setLoadingRecipes(true);
    getRecipes().then(() => {
      setLoadingRecipes(false);
    });
  }, []);

  return (
    <Box>
      <Text>
        home data
      </Text>
      <Skeleton isLoaded={!loadingRecipes}>
        {!loadingRecipes && userRecipes.length !== 0
        && userRecipes.map((recipe: recipe) => (
          <RecipeLink recipe={recipe} setSelectedRecipe={setSelectedRecipe} />
        ))}
      </Skeleton>
    </Box>
  );
}

export default HomeData;
