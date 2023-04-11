import {
  Button, Box,
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { HomeProps } from '../../types';

function Home({ signedInUser, homedata }: HomeProps) {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogoutLoading(true);
    signOut(auth)
      .then(() => {
        setLogoutLoading(false);
      })
      .catch((error) => { console.error(error); });
  };

  const handleAddRecipe = () => { navigate('/add'); };

  if (!signedInUser) return <Navigate to="/login" />;
  return (
    <Box textAlign="center">
      <Button
        isLoading={logoutLoading}
        onClick={handleLogout}
        m={2}
        mb={6}
      >
        Logout
      </Button>
      <Button
        onClick={handleAddRecipe}
        m={2}
        mb={6}
      >
        Add Recipe
      </Button>
      { homedata }
    </Box>
  );
}

export default Home;
