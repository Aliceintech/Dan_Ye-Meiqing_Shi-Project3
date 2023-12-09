// Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {currentUser ? (
          <>
            <Link to={`/user/${currentUser.username}`} style={{ marginRight: '20px' }}>
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