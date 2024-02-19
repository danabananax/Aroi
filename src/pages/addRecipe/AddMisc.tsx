import React, { SetStateAction } from 'react';
import {
  Flex,
  Input,
} from '@chakra-ui/react';
import { recipe } from '../../types';

interface Props {
  curRecipe: recipe
  setCurRecipe: React.Dispatch<SetStateAction<recipe>>
  minutes: number
  hours: number
  setMinutes: React.Dispatch<SetStateAction<number>>
  setHours: React.Dispatch<SetStateAction<number>>
}

function AddMisc({
  curRecipe, setCurRecipe, minutes, hours, setMinutes, setHours,
}: Props) {
  const handleServingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCurRecipe({ ...curRecipe, servings: parseInt(value, 10) });
  };

  return (
    <Flex direction="row" justify="space-between">
      <Input
        flex={2}
        onChange={handleServingsChange}
        placeholder="Servings"
        value={(curRecipe.servings) || ''}
        size="md"
      />
      <Input
        flex={1}
        type="number"
        onChange={(e) => {
          setHours(e.target.value.length > 0 ? parseInt(e.target.value, 10) : 0);
        }}
        placeholder="Hours"
        value={hours || ''}
        size="md"
        ml={2}
      />
      <Input
        flex={1}
        type="number"
        onChange={(e) => {
          setMinutes(e.target.value.length > 0 ? parseInt(e.target.value, 10) : 0);
        }}
        placeholder="Mins"
        value={minutes || ''}
        size="md"
        ml={2}
      />
    </Flex>
  );
}

export default AddMisc;
