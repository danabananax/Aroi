import {
  Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure, useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { decode } from 'base65536';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { db } from '../firebase';
import { recipe } from '../types';

interface Props {
    userId: string
}

function AddRecipeFromLinkBtn({ userId }: Props) {
  const [recipeCode, setRecipeCode] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const decodeString = () => {
    const uint8ArrayRecipe = decode(recipeCode);
    const decodedRecipe = JSON.parse(new TextDecoder().decode(uint8ArrayRecipe)) as recipe;
    return decodedRecipe;
  };

  const decodeAndSubmit = () => {
    try {
      setLoadingSubmit(true);
      const decodedObj = decodeString();
      if (!decodedObj.name || !decodedObj.instructions) {
        toast({
          title: "Recipe is incomplete and can't be submitted",
          status: 'error',
          duration: 4000,
        });
        return;
      }
      const newRecipeDocRef = doc(collection(db, 'users', userId, 'recipes'));
      setDoc(newRecipeDocRef, decodedObj)
        .then(() => {
          toast({
            title: 'Recipe successfully submitted',
            status: 'success',
            duration: 2000,
          });
          setLoadingSubmit(false);
          navigate(-1);
        })
        .catch((e) => {
          toast({
            title: e.name,
            status: 'error',
            duration: 4000,
          });
        });
    } catch (e: any) {
      toast({
        title: 'Recipe code not working, please make sure the code is valid',
        status: 'error',
        duration: 4000,
      });
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        Use Code
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Add recipe with code
            <Tooltip
              label="Use the code generated from an existing recipe to add it to your collection"
            >
              <QuestionOutlineIcon ml={4} />
            </Tooltip>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => {
              e.preventDefault();
              decodeAndSubmit();
            }}
            >
              <Input
                type="text"
                placeholder="Paste code here"
                size="lg"
                variant="filled"
                value={recipeCode}
                onChange={(e) => { setRecipeCode(e.target.value); }}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={loadingSubmit}
              colorScheme="blue"
              mr={3}
              onClick={decodeAndSubmit}
              disabled={recipeCode.length === 0}
            >
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddRecipeFromLinkBtn;
