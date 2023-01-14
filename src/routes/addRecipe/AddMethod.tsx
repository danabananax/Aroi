import React, { useRef, useState } from 'react';
import {
  Button, Flex, Heading, IconButton, Input, Text,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { setRecipeProps } from '../../types';

function AddMethod({ newRecipe, setNewRecipe }: setRecipeProps) {
  const [currStep, setCurrStep] = useState<string>('');
  const methodInput = useRef<HTMLInputElement>(null);

  const handleRemoveStep = (event: React.SyntheticEvent, stepToRemove: string) => {
    event.preventDefault();
    const filteredSteps = newRecipe.method.filter((step) => step !== stepToRemove);
    setNewRecipe({ ...newRecipe, method: filteredSteps });
  };

  const handleAddStep = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(newRecipe);
    setNewRecipe({
      ...newRecipe,
      method: [...newRecipe.method, currStep],
    });
    setCurrStep('');
    methodInput.current?.focus();
  };

  return (
    <>
      <Heading>Add Method</Heading>
      <form onSubmit={handleAddStep}>
        <Input
          onChange={(e) => setCurrStep(e.target.value)}
          placeholder="Method step"
          value={currStep}
          ref={methodInput}
        />
        <Button type="submit" display="none" />
      </form>
      {newRecipe.method.map((step) => (
        <Flex
          direction="row"
          w="100%"
          justify="space-between"
          key={`id${Math.random().toString(16).slice(2)}`}
        >
          <Text>{step}</Text>
          <IconButton
            aria-label="delete step from instructions"
            icon={<DeleteIcon />}
            variant="ghost"
            onClick={(e) => { handleRemoveStep(e, step); }}
          />
        </Flex>
      ))}
    </>
  );
}

export default AddMethod;
