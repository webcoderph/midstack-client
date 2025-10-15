import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { tAuthContextProps, tUser } from '../types';
import axios from 'axios';

const AuthContext = createContext<tAuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<tUser | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("midstack") ?? "{}");
    if (Object.keys(storedAuth).length > 0) {
      setToken(storedAuth.token);
      setUser(storedAuth.user);
    } 
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axios.post(`${import.meta.env.VITE_API_URI}/api/auth/login`, data);
      return res.data;
    },
    onSuccess: (result) => {
      const { data } = result;
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('midstack', JSON.stringify(data));
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('midstack');
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
