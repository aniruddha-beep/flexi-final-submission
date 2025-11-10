import React from 'react';
import { Link } from 'react-router-dom'; // <--- NEW: Import Link
import LogoutButton from './LogoutButton'; 

// Inline style for links to ensure they look correct
const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

/**
 * The Header component now uses <Link> for internal navigation.
 * @param {boolean} isLoggedIn - To conditionally show the button.
 * @param {function} onLogout - The handler function passed from App.jsx.
 */
const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem', 
      backgroundColor: '#f8f8f8' 
    }}>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        {/* FIX: Use <Link> component instead of <a> tags to prevent full page reloads */}
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/inventory" style={linkStyle}>Inventory</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </nav>
      {/* RENDER LOGIC: If logged in, render the LogoutButton and pass the handler */}
      {isLoggedIn && <LogoutButton onLogout={onLogout} />}
    </header>
  );
};

export default Header;