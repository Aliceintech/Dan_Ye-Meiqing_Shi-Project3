// App.jsx

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StatusProvider } from './context/StatusContext';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserDetails from './components/UserDetails';
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <AuthProvider>
      <StatusProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/:username" element={<UserDetails />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </Router>
      </StatusProvider>
    </AuthProvider>
  );
}

export default App;