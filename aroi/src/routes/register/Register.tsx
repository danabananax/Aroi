import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { Link, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import RegisterForm from './RegisterForm';
import { auth } from '../../firebase';
import { Iuser } from '../../App';

interface RegisterProps {
  signedInUser: Iuser
}

function Register({ signedInUser }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handlesubmit being run');
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => { console.log('successfully registered'); })
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
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <Button type="submit">
          Sign up
        </Button>
      </form>
      <Link to="/login">Login</Link>
    </>
  );
}

export default Register;
