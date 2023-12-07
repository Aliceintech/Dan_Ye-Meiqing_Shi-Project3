// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  currentUser: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // 检查用户登录状态
  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/checkLogin', {
        credentials: 'include', // 确保 cookie 被发送
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  // 当组件挂载时，检查登录状态
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // 登录处理逻辑
  const login = (user) => {
    setCurrentUser(user);
  };

  // 登出处理逻辑
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;