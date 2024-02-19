import {
  Button, Box, Flex,
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
    <Box textAlign="center" p={6} w={['390px', '600px', '1200px']}>
      <Flex mb={6} justify={['center', 'center', 'flex-start']}>
        <Button
          isLoading={logoutLoading}
          onClick={handleLogout}
          mr={4}
        >
          Logout
        </Button>
        <Button
          onClick={handleAddRecipe}
        >
          Add Recipe
        </Button>
      </Flex>
      { homedata }
    </Box>
  );
}

export default Home;
