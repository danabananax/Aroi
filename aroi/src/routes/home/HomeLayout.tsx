import { Button, Text, Box } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Iuser } from '../../App';
import { auth } from '../../firebase';

interface HomeProps {
  signedInUser: Iuser
}

function Home({ signedInUser }: HomeProps) {
  const handleLogout = () => {
    signOut(auth)
      .then(() => { console.log('successfully signed out'); })
      .catch((error) => { console.error(error); });
  };
  if (!signedInUser) return <Navigate to="/login" />;
  return (
    <Box>
      <Text size="6xl">Home</Text>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
}

export default Home;
