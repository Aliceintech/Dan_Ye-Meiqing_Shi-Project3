// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  currentUser: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (user) => {
    setCurrentUser(user);
    // 这里可以添加登录逻辑
  };

  const logout = () => {
    setCurrentUser(null);
    // 这里可以添加登出逻辑
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
