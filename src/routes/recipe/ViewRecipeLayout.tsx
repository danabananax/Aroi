import { Button, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Iuser } from '../../App';
import { recipe } from '../home/HomeData';

interface ViewRecipeProps {
  signedInUser: Iuser | undefined
  selectedRecipe: recipe
}

function ViewRecipeLayout({ signedInUser, selectedRecipe }: ViewRecipeProps) {
  const userId = signedInUser?.uid;
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };

  return userId ? (
    <div>
      <Button onClick={handleBack}>
        Back
      </Button>
      <Heading>{selectedRecipe.name}</Heading>
      <Text>{Object.keys(selectedRecipe.ingredients)}</Text>
      <Text>{selectedRecipe.method}</Text>
    </div>
  ) : <Navigate to="/login" />;
}

export default ViewRecipeLayout;
