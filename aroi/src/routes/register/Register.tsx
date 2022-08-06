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
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);
    console.log('handlesubmit being run');
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => { console.log('successfully registered'); setLoadingSubmit(false); })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        setLoadingSubmit(false);
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
        <Button isLoading={loadingSubmit} type="submit">
          Sign up
        </Button>
      </form>
      <Link to="/login">Login</Link>
    </>
  );
}

export default Register;
