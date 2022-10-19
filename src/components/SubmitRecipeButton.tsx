import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { doc, updateDoc } from 'firebase/firestore';
import { recipe } from '../types';
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
    // if key exists, post with current key
    const oldKey = newRecipe.id;
    setSubmitLoading(true);
    let newRecipeEntry:recipe;
    if (newRecipe.id) {
      newRecipeEntry = newRecipe;
    } else {
    // else make a new one
      newRecipeEntry = newRecipe;
      newRecipeEntry.id = uuidv4();
    }

    await setSubmitLoading(true);
    console.log(oldKey, newRecipeEntry.id);
    if (newRecipeEntry.id) {
      const recipesMapRef = doc(db, 'users', userId);
      updateDoc(recipesMapRef, { [`recipes.${newRecipeEntry.id}`]: newRecipeEntry })
        .then(() => { setSubmitLoading(false); })
        .catch((e) => console.log(e));
    }
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
