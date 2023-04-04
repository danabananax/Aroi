import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LoginForm from './LoginForm';
import { auth } from '../../firebase';
import { signedInUserProp } from '../../types';

function Login({ signedInUser }: signedInUserProp) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('successfully logged in: ', userCredential);
        setLoadingSubmit(false);
      })
      .catch((error) => {
        // TODO: Implement actual error handling in login page with user feedback
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        setLoadingSubmit(false);
      });
  };

  if (signedInUser) return <Navigate to="/" />;
  return (
    <Flex flexDirection="column" pt={28}>
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
