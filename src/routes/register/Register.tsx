import React, { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { Link, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import RegisterForm from './RegisterForm';
import { auth } from '../../firebase';
import { signedInUserProp } from '../../types';

function Register({ signedInUser }: signedInUserProp) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => { console.log('successfully registered: ', email); setLoadingSubmit(false); })
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
    </Flex>
  );
}

export default Register;
