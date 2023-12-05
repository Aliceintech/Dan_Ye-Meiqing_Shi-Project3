// Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {currentUser ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}


// function Navbar({ currentUser, onLogout }) {
//   return (
//     <nav>
//       <Link to="/">Home</Link>
//       {currentUser ? (
//         <div>
//           <span>Welcome, {currentUser.username}!</span>
//           <button onClick={onLogout}>Logout</button>
//         </div>
//       ) : (
//         <div>
//           <Link to="/login">Login</Link>
//           <Link to="/register">Register</Link>
//         </div>
//       )}
//     </nav>
//   );
// }

export default Navbar;