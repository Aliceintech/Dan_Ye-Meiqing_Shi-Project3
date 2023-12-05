import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ currentUser, onLogout }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      {currentUser ? (
        <div>
          <span>Welcome, {currentUser.username}!</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;