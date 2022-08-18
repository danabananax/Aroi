import {
  Button, Box, Heading,
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Iuser } from '../../App';
import { auth } from '../../firebase';
import HomeData from './HomeData';

interface HomeProps {
  signedInUser: Iuser
}

function Home({ signedInUser }: HomeProps) {
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = () => {
    setLogoutLoading(true);
    signOut(auth)
      .then(() => {
        console.log('successfully signed out');
        setLogoutLoading(false);
      })
      .catch((error) => { console.error(error); });
  };

  if (!signedInUser) return <Navigate to="/login" />;
  return (
    <Box>
      <Heading size="3xl">Home</Heading>
      <Button
        isLoading={logoutLoading}
        onClick={handleLogout}
        m={2}
      >
        Logout
      </Button>
      {signedInUser && <HomeData userId={signedInUser.uid} />}
    </Box>
  );
}

export default Home;
