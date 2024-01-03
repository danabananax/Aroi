import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import './index.css';

import 'focus-visible/dist/focus-visible';

const theme = extendTheme({
  styles: {
    global: {
      '.js-focus-visible :focus:not([data-focus-visible-added])': {
        outline: 'none',
        boxShadow: 'none',
      },
      h1: {
        fontSize: '3xl',
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '2xl',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: 'lg'
      },
      h4: {
        fontSize: 'md'
      },
      h5: {
        fontSize: 'sm'
      },
      h6: {
        fontSize: 'xs',
      }
    },
    body: {
      bg: 'gray.50',
      color: 'gray.900',
    },
    h1: {
      fontSize: '3xl',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2xl',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 'lg'
    },
    h4: {
      fontSize: 'md'
    },
    h5: {
      fontSize: 'sm'
    },
    h6: {
      fontSize: 'xs',
    }
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
