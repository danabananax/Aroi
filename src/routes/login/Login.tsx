import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Box, Button, Flex } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LoginForm from './LoginForm';
import { auth } from '../../firebase';
import { signedInUserProp } from '../../types';

function Login({ signedInUser }: signedInUserProp) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Login Success');
        setLoadingSubmit(false);
      })
      .catch((error) => {
        setErrorMessage(error.code);
        setLoadingSubmit(false);
      });
  };

  if (signedInUser) return <Navigate to="/" />;
  return (
    <Flex flexDirection="column" pt={28} alignItems="center" textAlign="center">
      <form onSubmit={handleSubmit} onFocus={() => setErrorMessage('')}>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <Button isLoading={loadingSubmit} type="submit" m={2}>Login</Button>
      </form>
      <Link to="/register">Register</Link>
      <Box mt={12}>
        {errorMessage ?? ''}
      </Box>

    </Flex>
  );
}

export default Login;
