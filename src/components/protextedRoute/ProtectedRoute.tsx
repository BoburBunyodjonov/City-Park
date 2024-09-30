// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // AuthContext'dan useAuth hook'ini import qiling

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { currentUser, isAdmin } = useAuth();

  // Foydalanuvchi autentifikatsiya qilinganmi va adminmi?
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return element; // Agar admin bo'lsa, elementni qaytaradi
};

export default ProtectedRoute;
