import React, { useRef, useState } from 'react';
import {
  Box, Button, Heading, Input,
} from '@chakra-ui/react';
import { setRecipeProps } from '../../types';

function AddTag({ newRecipe, setNewRecipe }: setRecipeProps) {
  const [tag, setTag] = useState<string>('');
  const tagInput = useRef<HTMLInputElement>(null);

  const handleAddTag = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(newRecipe);
    if (!newRecipe.tags.includes(tag)) {
      setNewRecipe({
        ...newRecipe,
        tags: [...newRecipe.tags, tag],
      });
    }
    setTag('');
    tagInput.current?.focus();
  };

  return (
    <>
      <Heading size="md" mt={3}>Add Tags</Heading>
      <form onSubmit={handleAddTag}>
        <Box py={2}>
          <Input
            onChange={(e) => setTag(e.target.value)}
            placeholder="Tag name"
            value={tag}
            ref={tagInput}
            size="md"
          />
        </Box>
        <Button type="submit" display="none" />
      </form>
    </>
  );
}

export default AddTag;
