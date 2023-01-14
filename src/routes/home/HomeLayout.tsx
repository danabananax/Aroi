import {
  Button, Box,
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { HomeProps } from '../../types';
import HomeData from './HomeData';

function Home({ signedInUser, setSelectedRecipe }: HomeProps) {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogoutLoading(true);
    signOut(auth)
      .then(() => {
        console.log('successfully signed out');
        setLogoutLoading(false);
      })
      .catch((error) => { console.error(error); });
  };

  const handleAddRecipe = () => { navigate('/add'); };

  if (!signedInUser) return <Navigate to="/login" />;
  return (
    <Box>
      <Button
        isLoading={logoutLoading}
        onClick={handleLogout}
        m={2}
      >
        Logout
      </Button>
      <Button
        onClick={handleAddRecipe}
        m={2}
      >
        Add Recipe
      </Button>
      {signedInUser && <HomeData userId={signedInUser.uid} setSelectedRecipe={setSelectedRecipe} />}
    </Box>
  );
}

export default Home;
