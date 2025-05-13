// src/Navbar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import EZMovLogo from './EZMov.png'; // Import logo

function Navbar({ isAuthenticated, currentUser, handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/login') return null;

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-center">
        <img src={EZMovLogo} alt="EZTechMovie Logo" className="navbar-logo" />
      </div>
      <ul className="navbar-links">
        {isAuthenticated && (
          <>
            <li><Link to="/">Movies</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/streamlist">Stream List</Link></li>
            <li><Link to="/about">About</Link></li>
          </>
        )}
      </ul>
      <div className="navbar-right">
        {isAuthenticated && currentUser && (
          <>
            <span className="username">Welcome, {currentUser.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;