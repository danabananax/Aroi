import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LoginForm from './LoginForm';
import { auth } from '../../firebase';
import { Iuser } from '../../App';

interface LoginProps {
  signedInUser: Iuser
}

function Login({ signedInUser }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => { console.log('successfully logged in'); })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };
  if (signedInUser) return <Navigate to="/" />;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <Button type="submit">Login</Button>
      </form>
      <Link to="/register">Register</Link>
    </>
  );
}

export default Login;
