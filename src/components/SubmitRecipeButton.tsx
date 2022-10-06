import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { recipe, recipeEntry } from '../types';
import { db } from '../firebase';

interface submitRecipeButtonProps {
    newRecipe: recipe
    userId: string
}

function SubmitRecipeButton({ newRecipe, userId }: submitRecipeButtonProps) {
  const [submitLoading, setSubmitLoading] = useState(false);

  const {
    name, method, ingredients, servings,
  } = newRecipe;
  // true if all required fields are populated
  const isSubmittable = !!(name.length
    && method.length
    && Object.keys(ingredients).length
    && servings);

  const handleSubmitRecipe = async () => {
    await setSubmitLoading(true);
    const key = uuidv4();
    const newRecipeEntry:recipeEntry = {};
    newRecipeEntry[key] = newRecipe;
    const userRef = doc(db, 'users', userId);

    setDoc(
      userRef,
      { recipes: newRecipeEntry },
      { merge: true },
    )
      .then(() => { setSubmitLoading(false); })
      .catch((e) => console.log(e));
  };

  return (
    <Button
      isDisabled={!isSubmittable}
      isLoading={submitLoading}
      onClick={handleSubmitRecipe}
    >
      Submit
    </Button>
  );
}

export default SubmitRecipeButton;
