import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Text, IconButton } from '@chakra-ui/react';
import React from 'react';
import { DeletableEntryProps } from '../../types';

function DeletableEntry({ identifier, textContent, deleteFunction }: DeletableEntryProps) {
  return (
    <Flex
      direction="row"
      w="100%"
      justify="space-between"
      align="center"
      key={`id${Math.random().toString(16).slice(2)}`}
    >
      <Text>
        {textContent}
      </Text>
      <IconButton
        id={identifier}
        aria-label={`Delete ${identifier} entry from list`}
        icon={<DeleteIcon />}
        variant="ghost"
        onClick={(e) => { deleteFunction(e, identifier); }}
        opacity="30%"
        size="xs"
        _hover={{ opacity: '100%' }}
      />
    </Flex>
  );
}

export default DeletableEntry;
