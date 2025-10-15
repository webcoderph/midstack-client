import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
export const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  if (!token) { 
    const storedAuth = JSON.parse(localStorage.getItem("midstack") ?? "{}");
    if (Object.keys(storedAuth).length > 0) {
        if (storedAuth.token) {
            return children;
        }
    } 
    return <Navigate to="/login" replace />;
  }
  return children;
};
