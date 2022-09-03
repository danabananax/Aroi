import React, { useEffect, useState } from 'react';
import {
  Box, Skeleton,
} from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import RecipeLink from '../components/RecipeLink';
import { recipe } from '../../types';

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
