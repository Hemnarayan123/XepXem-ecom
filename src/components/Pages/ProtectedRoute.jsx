import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthToken';
import React from 'react';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/signin" />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
