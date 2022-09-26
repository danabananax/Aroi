import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import {
  arrayUnion, doc, updateDoc,
} from 'firebase/firestore';
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
    await setSubmitLoading(true);
    const userRef = doc(db, 'users', userId);
    updateDoc(userRef, {
      recipes: arrayUnion(newRecipe),
    })
      .then(() => { setSubmitLoading(false); });
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
