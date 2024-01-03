import './styles.scss';
import { EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { setRecipeProps } from '../../types';

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, 
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
]


function RecipeEditor({ curRecipe, setCurRecipe }: setRecipeProps) {

  console.log(curRecipe);
  const content = curRecipe.instructions;
  const editor = useEditor({
    content,
    extensions,
    onUpdate: () => {
      if(editor) setCurRecipe({...curRecipe, instructions: editor?.getHTML()})
    },
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none'
      }
    }
  });

  function printHTML() {
    console.log(editor?.getHTML());
  }

  if(!editor) return null;
  
  return (
    <Box width={[400, 600]}>
      {editor && <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          isActive={editor.isActive('bold')}
          size="xs"
          variant={'outline'}
          mr={1}
        >
          bold
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          isActive={editor.isActive('italic')}
          size="xs"
          variant={'outline'}
          mr={1}
        >
          italic
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          size="xs"
          isActive={editor.isActive('heading', { level: 1 })}
          variant={'outline'}
          mr={1}
        >
          h1
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          size="xs"
          variant={'outline'}
          mr={1}
        >
          h2
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          size="xs"
          variant={'outline'}
          mr={1}
        >
          bullet list
        </Button>
      </FloatingMenu>}
      <EditorContent editor={editor} content={content}/>
      <Button
        onClick={printHTML}
        my={4}
      >
        Print HTML
      </Button>
    </Box>
  );
};

export default RecipeEditor;