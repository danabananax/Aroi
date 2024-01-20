import React from 'react';
import { recipe } from '../types';
import { IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import { encode } from 'base65536';

interface Props {
    recipe: recipe
}

function EncodeAndCopyRecipeBtn({ recipe }: Props) {
    const toast = useToast();
    const encodeAndCopy = () => {
        const uint8arrayString = new TextEncoder().encode(JSON.stringify(recipe));
        const encoded = encode(uint8arrayString);
        navigator.clipboard.writeText(encoded);
        toast({
            title: `Copied ${recipe.name} code to clipboard`,
            status: 'info',
            duration: 2000,
        });
    }

    return (
        <Tooltip label="Copy link to clipboard">
            <IconButton 
                icon={<LinkIcon boxSize="32px" />} 
                variant="ghost"
                mr={4}
                aria-label="Copy sharable link to clipboard" 
                onClick={encodeAndCopy}
            />
        </Tooltip>
    )
}

export default EncodeAndCopyRecipeBtn;