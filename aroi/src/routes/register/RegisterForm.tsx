import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react';

interface registerFormProps {
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
}

function RegisterForm({
  email, setEmail, password, setPassword,
}: registerFormProps) {
  return (
    <>
      <FormControl p={2}>
        <Input
          type="email"
          placeholder="Email"
          size="lg"
          variant="filled"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormErrorMessage>Please use a valid email.</FormErrorMessage>
      </FormControl>
      <FormControl p={2}>
        <Input
          type="password"
          placeholder="Password"
          size="lg"
          variant="filled"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
    </>
  );
}

export default RegisterForm;
