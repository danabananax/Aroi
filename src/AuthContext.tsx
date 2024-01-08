/* eslint-disable no-unused-vars */
import {
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { auth } from './firebase';

const AuthContext = createContext<User | null>(auth.currentUser);

interface Props {
    children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  /*
  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={user}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
