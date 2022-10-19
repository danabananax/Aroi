import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { recipe } from '../../types';

function EditRecipeButton({ recipe }: {recipe: recipe}) {
  const navigate = useNavigate();
  const handleEditRecipe = () => { navigate('/add', { state: recipe }); };
  return <Button onClick={handleEditRecipe} m={2}>Edit Recipe</Button>;
}

export default EditRecipeButton;
