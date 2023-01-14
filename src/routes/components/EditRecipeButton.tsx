import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { EditIcon } from '@chakra-ui/icons';
import { recipe } from '../../types';

function EditRecipeButton({ recipe }: {recipe: recipe}) {
  const navigate = useNavigate();
  const handleEditRecipe = () => { navigate('/add', { state: recipe }); };
  return <IconButton icon={<EditIcon boxSize="32px" />} variant="ghost" aria-label="Edit recipe button" onClick={handleEditRecipe} />;
}

export default EditRecipeButton;
