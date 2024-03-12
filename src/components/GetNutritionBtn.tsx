import React, { SetStateAction, useState } from 'react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import {
  Button, Modal, ModalOverlay, ModalContent,
  ModalHeader, Tooltip, ModalCloseButton, ModalBody, Input, ModalFooter, useDisclosure, useToast,
} from '@chakra-ui/react';
import { recipe } from '../types';

export interface ingredientNutrition {
  name: string,
  calories: number
  serving_size_g: number
  fat_total_g: number
  fat_saturated_g: number
  protein_g: number
  sodium_mg: number
  potassium_mg: number
  cholesterol_mg: number
  carbohydrates_total_g: number
  fiber_g: number
  sugar_g: number
}

interface Props {
  setCurRecipe: React.Dispatch<SetStateAction<recipe>>;
  curRecipe: recipe
}

export default function GetNutritionBtn({ setCurRecipe, curRecipe }: Props) {
  const [loadingNutrition, setLoadingNutrition] = useState(false);
  const [curIngredients, setCurIngredients] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const getNutrition = async () => {
    setLoadingNutrition(true);
    const query = curIngredients.split('\n').join(' and ');
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': import.meta.env.VITE_API_NINJA_KEY,
        },
      });
      const nutritionInfo = await response.json();
      if (nutritionInfo.length < 1 || !response.ok) {
        throw new Error('Something went wrong.');
      }
      return nutritionInfo;
    } catch (e: any) {
      return toast({
        title: 'Something went wrong',
        status: 'error',
        duration: 4000,
      });
    } finally {
      setLoadingNutrition(false);
    }
  };

  const submitNutrition = () => {
    const total = {
      name: 'total',
      calories: 0,
      serving_size_g: 0,
      fat_total_g: 0,
      fat_saturated_g: 0,
      protein_g: 0,
      sodium_mg: 0,
      potassium_mg: 0,
      cholesterol_mg: 0,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0,
    } as any;

    getNutrition().then((nutrition) => {
      nutrition.forEach((ingredient: any) => {
        Object.keys(ingredient).forEach((key) => {
          if (key !== 'name') total[key] += Math.round(ingredient[key]);
        });
      });
      setCurRecipe({ ...curRecipe, nutrition: total });
      toast({
        title: 'Successfully added nutrition',
        status: 'success',
        duration: 2000,
      });
      onClose();
    });
  };

  return (
    <>
      <Button onClick={onOpen}>
        Get Nutrition (AI)
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Paste Ingredients
            <Tooltip
              label="Paste the ingredients from your recipe to get nutrition details powered by AI!"
            >
              <QuestionOutlineIcon ml={4} />
            </Tooltip>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => {
              e.preventDefault();
              submitNutrition();
            }}
            >
              <Input
                type="text"
                placeholder="eg: 1 cup of milk 3 apples"
                size="lg"
                variant="filled"
                value={curIngredients}
                onChange={(e) => { setCurIngredients(e.target.value); }}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={loadingNutrition}
              colorScheme="blue"
              mr={3}
              onClick={submitNutrition}
              disabled={curIngredients.length < 1}
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
