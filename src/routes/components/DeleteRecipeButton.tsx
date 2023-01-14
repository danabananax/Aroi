import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import {
  deleteDoc, doc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';
import { db } from '../../firebase';
import { deleteRecipeProps } from '../../types';

function DeleteRecipeButton({ keyToDelete, userId }: deleteRecipeProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigate = useNavigate();

  const handleDeleteRecipe = () => {
    setLoadingDelete(true);
    if (keyToDelete) {
      const recipesToDeleteRef = doc(db, 'users', userId, 'recipes', keyToDelete);
      deleteDoc(recipesToDeleteRef)
        .then(() => { navigate('/'); })
        .catch((e) => console.log(e))
        .finally(() => setLoadingDelete(false));
    }
  };

  return (
    <>
      <IconButton icon={<DeleteIcon boxSize="32px" />} variant="ghost" aria-label="Delete recipe button" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {`Are you sure you want to delete this (${keyToDelete}) recipe?`}
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
