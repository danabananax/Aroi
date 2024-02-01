import React, { useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import {
  collection, doc, setDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { recipe } from '../types';
import { db } from '../firebase';

interface submitRecipeButtonProps {
    newRecipe: recipe
    userId: string
    setSelectedRecipe: React.Dispatch<recipe>
    totalTime: number
}

function SubmitRecipeButton({
  newRecipe, userId, setSelectedRecipe, totalTime,
}: submitRecipeButtonProps) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    name,
    instructions,
  } = newRecipe;

  const isSubmittable = !!(name.length && instructions.length);

  const handleSubmitRecipe = () => {
    setSubmitLoading(true);
    let newRecipeCopy = newRecipe;
    newRecipeCopy = { ...newRecipeCopy, total_time: totalTime };

    // edit vs add new doc
    const newRecipeDocRef = newRecipeCopy.id
      ? doc(db, 'users', userId, 'recipes', newRecipeCopy?.id)
      : doc(collection(db, 'users', userId, 'recipes'));

    setDoc(newRecipeDocRef, newRecipeCopy)
      .then(() => {
        toast({
          title: 'Recipe successfully uploaded',
          status: 'success',
          duration: 2000,
        });
        setSubmitLoading(false);
        setSelectedRecipe(newRecipe);
        navigate(-1);
      })
      .catch((e) => {
        toast({
          title: e.name,
          status: 'error',
          duration: 4000,
        });
      });
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
