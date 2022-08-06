import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './components/AuthContext';

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const user = useAuthContext;
  return user() ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
