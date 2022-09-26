import React, { useRef, useState } from 'react';
import { Button, Heading, Input } from '@chakra-ui/react';
import { setRecipeProps } from '../../types';

function AddMethod({ newRecipe, setNewRecipe }: setRecipeProps) {
  const [currStep, setCurrStep] = useState<string>('');
  const methodInput = useRef<HTMLInputElement>(null);

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
        <div key={`id${Math.random().toString(16).slice(2)}`}>
          {step}
        </div>
      ))}
    </>
  );
}

export default AddMethod;
