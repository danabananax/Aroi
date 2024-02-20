import { StarIcon } from '@chakra-ui/icons';
import {
  Flex, IconButton, Spacer, Tooltip, useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { recipe } from '../../../types';
import { db } from '../../../firebase';

interface Props {
  recipe: recipe
  userId: string
}

function AddFavsBar({ recipe, userId }: Props) {
  const [favourited, setFavourited] = useState(recipe.favourite);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  function handleToggleFavourite(favourited: boolean) {
    setLoading(true);
    const recipeDocRef = doc(db, 'users', userId, 'recipes', recipe.id);
    updateDoc(recipeDocRef, {
      favourite: !favourited,
    })
      .then(() => {
        setFavourited(!favourited);
        toast({
          title: `Recipe ${!favourited ? 'added to' : 'removed from'} favourites`,
          status: 'success',
          duration: 2000,
        });
      })
      .catch((e) => {
        toast({
          title: e.name,
          status: 'error',
          duration: 4000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Flex direction="row" justifyContent="space-between" width="100%" mb={4}>
      <Spacer />
      <Tooltip label="Add to favourites">
        <IconButton
          onClick={() => handleToggleFavourite(favourited)}
          isLoading={loading}
          variant="ghost"
          icon={
            <StarIcon boxSize="32px" color={favourited ? 'yellow.200' : 'gray.100'} />
        }
          aria-label="Add to favourites button"
        />
      </Tooltip>
    </Flex>
  );
}

export default AddFavsBar;
