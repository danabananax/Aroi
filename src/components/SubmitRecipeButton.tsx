import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import {
  collection, doc, setDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { recipe } from '../types';
import { db } from '../firebase';

interface submitRecipeButtonProps {
    newRecipe: recipe
    userId: string
}

function SubmitRecipeButton({ newRecipe, userId }: submitRecipeButtonProps) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  const {
    name, method, ingredients, servings,
  } = newRecipe;
  // true if all required fields are populated
  const isSubmittable = !!(name.length
    && method.length
    && Object.keys(ingredients).length
    && servings);

  const handleSubmitRecipe = async () => {
    setSubmitLoading(true);
    const newRecipeCopy = newRecipe;
    console.log(`Submitting ${JSON.stringify(newRecipeCopy)}`);
    const newRecipeDocRef = newRecipeCopy.id
      ? doc(db, 'users', userId, 'recipes', newRecipeCopy.id)
      : doc(collection(db, 'users', userId, 'recipes'));
    try {
      await setDoc(newRecipeDocRef, newRecipeCopy);
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitLoading(false);
      navigate('/');
    }
  };

  return (
    <Button
      isDisabled={!isSubmittable}
      isLoading={submitLoading}
      onClick={handleSubmitRecipe}
      mt={4}
    >
      Submit
    </Button>
  );
}

export default SubmitRecipeButton;
