import React, { useState } from 'react';
import {
  Box, Button, Flex, useToast,
} from '@chakra-ui/react';
import { Link, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import RegisterForm from './RegisterForm';
import { auth } from '../../firebase';
import { signedInUserProp } from '../../types';

function Register({ signedInUser }: signedInUserProp) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast({
          title: 'Successfully registered',
        });
      })
      .then(() => { setLoadingSubmit(false); })
      .catch((error: FirebaseError) => {
        setErrorMessage(error.code);
        setLoadingSubmit(false);
      });
  };
  if (signedInUser) return <Navigate to="/" />;
  return (
    <Flex flexDirection="column" pt={28} alignItems="center" textAlign="center">
      <form onSubmit={handleSubmit} onFocus={() => setErrorMessage('')}>
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <Button isLoading={loadingSubmit} type="submit" m={2}>
          Sign up
        </Button>
      </form>
      <Link to="/login">Login</Link>
      <Box mt={12}>
        {errorMessage ?? ''}
      </Box>
    </Flex>
  );
}

export default Register;
