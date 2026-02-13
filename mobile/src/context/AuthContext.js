import React, { createContext, useContext, useMemo, useState } from 'react';
import api, { setAuthToken } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setToken(data.accessToken);
    setAuthToken(data.accessToken);
  };

  const signup = async (name, email, password) => {
    const { data } = await api.post('/auth/signup', { name, email, password });
    setToken(data.accessToken);
    setAuthToken(data.accessToken);
  };

  const logout = () => {
    setToken(null);
    setAuthToken(null);
  };

  const value = useMemo(() => ({ token, login, signup, logout, isAuthenticated: !!token }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
