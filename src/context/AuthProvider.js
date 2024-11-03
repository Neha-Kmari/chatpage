import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const authToken = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId');
    if (authToken && storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
    }
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setUserId(user.userId);
    localStorage.setItem('authToken', user.token);
    localStorage.setItem('userId', user.userId);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
