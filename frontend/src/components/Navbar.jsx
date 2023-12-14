// Navbar.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <form onSubmit={handleSearch}>
          <input
            className="input-field"
            type="text"
            placeholder="Search Users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="button" type="submit">Search</button>
        </form>
      </div>
      <div className="user-info">
        {currentUser ? (
          <>
            <Link to={'/user/${currentUser.username}'} style={{ marginRight: '20px' }}>
              {currentUser.username}
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            {' '}
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;