import {
  Box, Skeleton,
} from '@chakra-ui/react';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import './App.css';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import HomeLayout from './pages/home/HomeLayout';
import ViewRecipeLayout from './pages/recipe/ViewRecipeLayout';
import { Iuser, recipe } from './types';
import AddRecipeContainer from './pages/addRecipe/AddRecipeContainer';
import HomeData from './pages/home/HomeData';

function App() {
  const [signedInUser, setSignedInUser] = useState<Iuser>(auth.currentUser);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const [selectedRecipe, setSelectedRecipe] = useState<recipe>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoadingAuth(true);
      if (user) {
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
      <Box minH="100vh" py={[4, 20]} textAlign="center">
        <Skeleton isLoaded={!loadingAuth}>
          <Routes>
            <Route
              path="/"
              element={(
                <HomeLayout
                  signedInUser={signedInUser}
                  homedata={(
                    <HomeData
                      userId={signedInUser?.uid}
                      setSelectedRecipe={setSelectedRecipe}
                    />
                  )}
                />
                  )}
            />
            <Route path="add" element={<AddRecipeContainer signedInUser={signedInUser} setSelectedRecipe={setSelectedRecipe} />} />
            <Route path="login" element={<Login signedInUser={signedInUser} />} />
            <Route path="register" element={<Register signedInUser={signedInUser} />} />
            <Route path="edit" element={<AddRecipeContainer signedInUser={signedInUser} setSelectedRecipe={setSelectedRecipe} />} />
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
    </BrowserRouter>
  );
}

export default App;
