import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Iuser } from '../../App';
import { db } from '../../firebase';

interface ViewRecipeProps {
  signedInUser: Iuser | undefined
}

function ViewRecipeLayout({ signedInUser }: ViewRecipeProps) {
  const { recipeId } = useParams();
  const userId = signedInUser?.uid;
  const [recipe, setRecipe] = useState<any>();

  const getRecipe = async () => {
    try {
      if (!recipeId) throw new Error(`No recipe Id in URL parameters: ${recipeId}`);
      if (userId) {
        const userRecipesDoc = doc(db, 'users', userId);
        const recipeDoc = await getDoc(userRecipesDoc);
        await setRecipe(recipeDoc.data()?.recipes[recipeId]);
        console.log(`recipe set: ${recipe}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div>
      {recipe}
    </div>
  );
}

export default ViewRecipeLayout;
