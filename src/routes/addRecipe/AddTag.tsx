import React, { useRef, useState } from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box, Button, Heading, Input, useToast,
} from '@chakra-ui/react';
import { setRecipeProps } from '../../types';

function AddTag({ newRecipe, setNewRecipe }: setRecipeProps) {
  const [tag, setTag] = useState<string>('');
  const tagInput = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleAddTag = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!newRecipe.tags.includes(tag)) {
      setNewRecipe({
        ...newRecipe,
        tags: [...newRecipe.tags, tag],
      });
    }
    toast({
      title: `${tag} added to tags`,
      status: "info",
      duration: 1500,
      position: "top",
    })
    setTag('');
    tagInput.current?.focus();
  };

  return (
    <AccordionItem border="none">
      <AccordionButton justifyContent="space-between">
        <Heading size="md">Add Tags</Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <form onSubmit={handleAddTag}>
          <Box py={2}>
            <Input
              onChange={(e) => setTag(e.target.value)}
              placeholder="Tag name"
              value={tag}
              ref={tagInput}
              size="md"
              mb={2}
            />
          </Box>
          <Button type="submit" size={"sm"}>
            Add Tag
          </Button>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default AddTag;
