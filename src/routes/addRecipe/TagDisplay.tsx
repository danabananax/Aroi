import { Box, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { ViewRecipeProps, setRecipeProps } from "../../types";

function TagDisplay({ newRecipe, setNewRecipe }: setRecipeProps) {
    const handleRemoveTag = (event: React.SyntheticEvent, tagToRemove: string) => {
        event.preventDefault();
        const newTags = newRecipe.tags.filter((tag) => tag !== tagToRemove);
        setNewRecipe({ ...newRecipe, tags: newTags });
    };

    return (
        <Box textAlign={"left"}>
            {newRecipe.tags.map((tag) => (
                <Tag
                    size="sm"
                    key={uuidv4()}
                    borderRadius="full"
                    variant="subtle"
                    colorScheme="pink"
                    mb={2}
                    mr={2}
                >
                    <TagLabel>{tag.charAt(0).toUpperCase() + tag.slice(1)}</TagLabel>
                    <TagCloseButton onClick={(e) => handleRemoveTag(e, tag)} />
                </Tag>
                ))}
        </Box>
    );
}

export default TagDisplay;