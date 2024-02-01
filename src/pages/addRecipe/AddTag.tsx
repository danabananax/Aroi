import React, { useRef, useState } from 'react';
import {
  Box, Input, useToast,
} from '@chakra-ui/react';
import { setRecipeProps } from '../../types';

function AddTag({ curRecipe, setCurRecipe }: setRecipeProps) {
  const [tag, setTag] = useState<string>('');
  const tagInput = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleAddTag = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!curRecipe.tags.includes(tag)) {
      setCurRecipe({
        ...curRecipe,
        tags: [...curRecipe.tags, tag],
      });
    }
    toast({
      title: `${tag} added to tags`,
      status: 'info',
      duration: 1500,
      position: 'top',
    });
    setTag('');
    tagInput.current?.focus();
  };

  return (
    <form onSubmit={handleAddTag}>
      <Box my={2}>
        <Input
          onChange={(e) => setTag(e.target.value)}
          placeholder="Press 'enter' to add tags"
          value={tag}
          ref={tagInput}
          size="md"
          mb={2}
        />
      </Box>
    </form>
  );
}

export default AddTag;
