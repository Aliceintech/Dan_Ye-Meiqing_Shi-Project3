// AuthContext.jsx
// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  currentUser: null,
  login: () => {},
  logout: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // 检查用户登录状态
  const checkLoginStatus = async () => {
    console.log("start checking");
    try {
      const response = await fetch('/api/user/checkLogin', {
        credentials: 'include', // 确保 cookie 被发送
      });
      console.log("I am trying");

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
      } else {
        console.log("Cannot fetch")
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
  const logout = async () => {
    try {
      // Send a request to the server to end the session
      const response = await fetch('/api/user/logout', {
        method: 'POST',
        credentials: 'include', // include cookies
      });
      if (response.ok) {
        // If logout is successful, update the local state
        setCurrentUser(null);
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;