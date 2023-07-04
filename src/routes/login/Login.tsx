import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LoginForm from './LoginForm';
import { auth } from '../../firebase';
import { signedInUserProp } from '../../types';
import { FirebaseError } from 'firebase/app';

function Login({ signedInUser }: signedInUserProp) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast({
          title: "Login successful, welcome back!",
          status: 'success',
          duration: 2000,
        })
        setLoadingSubmit(false);
      })
      .catch((e) => {
        toast({
          title: e.code,
          status: 'error',
          duration: 2000,
        })
        setLoadingSubmit(false);
      });
  };

  if (signedInUser) return <Navigate to="/" />;
  return (
    <Flex flexDirection="column" pt={28} alignItems="center" textAlign="center">
      <form onSubmit={handleSubmit}>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <Button isLoading={loadingSubmit} type="submit" m={2}>Login</Button>
      </form>
      <Link to="/register">Register</Link>
    </Flex>
  );
}

export default Login;
