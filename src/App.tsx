import {
  Box,
  Center, Heading, Skeleton, Text,
} from '@chakra-ui/react';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import './App.css';
// import ProtectedRoute from './routes/ProtectedRoute';
import Register from './routes/register/Register';
import Login from './routes/login/Login';
import HomeLayout from './routes/home/HomeLayout';
import ViewRecipeLayout from './routes/recipe/ViewRecipeLayout';
import { Iuser, recipe } from './types';
import AddRecipeContainer from './routes/addRecipe/AddRecipeContainer';

function App() {
  const [signedInUser, setSignedInUser] = useState<Iuser>(auth.currentUser);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const [selectedRecipe, setSelectedRecipe] = useState<recipe>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoadingAuth(true);
      if (user) {
        console.log('Auth state changed');
        setSignedInUser(user);
      } else {
        setSignedInUser(null);
      }
      setLoadingAuth(false);
    });
    return unsubscribe;
  });

  return (
    <BrowserRouter>
      <Center minW="60vw" h="100vh">
        <Box h="100%">
          <Heading fontSize="8xl" m={6}>aroi</Heading>
          <Box pt="6em">
            <Skeleton isLoaded={!loadingAuth}>
              <Text fontSize="4xl">{ signedInUser ? 'signed in' : 'signed out' }</Text>
              <Routes>
                <Route path="/" element={<HomeLayout signedInUser={signedInUser} setSelectedRecipe={setSelectedRecipe} />} />
                <Route path="add" element={<AddRecipeContainer signedInUser={signedInUser} />} />
                <Route path="login" element={<Login signedInUser={signedInUser} />} />
                <Route path="register" element={<Register signedInUser={signedInUser} />} />
                <Route
                  path="recipe"
                  element={(
                    <ViewRecipeLayout
                      signedInUser={signedInUser}
                      selectedRecipe={selectedRecipe}
                    />
)}
                />
              </Routes>
            </Skeleton>
          </Box>
        </Box>
      </Center>
    </BrowserRouter>
  );
}

export default App;
