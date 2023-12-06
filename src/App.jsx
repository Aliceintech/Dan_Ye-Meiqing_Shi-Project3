// App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StatusProvider } from './context/StatusContext';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';

function App() {

  // const [currentUser, setCurrentUser] = useState(null);

  // const handleLogout = () => {
  //   setCurrentUser(null);
  //   // 这里处理注销逻辑，如清除localStorage等
  // };

  return (
    <AuthProvider>
      <StatusProvider> {/* 添加 StatusProvider */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/:username" element={<UserProfile />} />
          </Routes>
        </Router>
      </StatusProvider> {/* 结束 StatusProvider */}
    </AuthProvider>
  );
}

export default App;