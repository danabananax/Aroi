/* eslint-disable no-unused-vars */
import {
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { auth } from '../firebase';

const AuthContext = createContext<User | null>(null);

interface Props {
    children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  // const [loadingAuth, setLoadingAuth] = useState(true);
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
      console.log('Auth user changed: ', currentuser);
      setUser(currentuser);
      // setLoadingAuth(false);
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
