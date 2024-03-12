import React from 'react';
import {
  Text,
} from '@chakra-ui/react';
import { ingredientNutrition } from './GetNutritionBtn';

interface Props {
  nutrition: ingredientNutrition
}

export default function DisplayNutrition({ nutrition }: Props) {
  return (
    <>
      <Text>{`Calories: ${nutrition.calories}`}</Text>
      <Text>{`Total fat: ${nutrition.fat_total_g}g`}</Text>
      <Text>{`Saturated fat: ${nutrition.fat_saturated_g}g`}</Text>
      <Text>{`Protein: ${nutrition.protein_g}g`}</Text>
      <Text>{`Carbs: ${nutrition.carbohydrates_total_g}g`}</Text>
      <Text>{`Sodium: ${nutrition.sodium_mg}mg`}</Text>
      <Text>{`Sugar: ${nutrition.sugar_g}g`}</Text>
      <Text>{`Potassium: ${nutrition.potassium_mg}mg`}</Text>
      <Text>{`Fiber: ${nutrition.fiber_g}g`}</Text>
    </>
  );
}
