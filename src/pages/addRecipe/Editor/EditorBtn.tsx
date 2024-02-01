import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

function EditorBtn({ children }: ButtonProps) {
  return (
    <Button
      border="1px solid #000"
      borderRadius={10}
      lineHeight={1}
      height={6}
      px={2}
      mr={1}
      backgroundColor="#fff"
    >
      { children }
    </Button>
  );
}

export default EditorBtn;
