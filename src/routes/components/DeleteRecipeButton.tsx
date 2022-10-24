import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { deleteField, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { deleteRecipeProps } from '../../types';

function DeleteRecipeButton({ keyToDelete, userId }: deleteRecipeProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigate = useNavigate();

  const handleDeleteRecipe = () => {
    setLoadingDelete(true);
    const recipesMapRef = doc(db, 'users', userId);
    updateDoc(recipesMapRef, { [`recipes.${keyToDelete}`]: deleteField() })
      .then(() => { navigate('/'); })
      .catch((e) => console.log(e))
      .finally(() => setLoadingDelete(false));
  };

  return (
    <>
      <Button onClick={onOpen}>Delete Recipe</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this recipe?
          </ModalBody>
          <ModalFooter>
            <Button isLoading={loadingDelete} colorScheme="blue" mr={3} onClick={handleDeleteRecipe}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  );
}

export default DeleteRecipeButton;
