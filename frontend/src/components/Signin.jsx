import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxSizing: 'border-box',
  fontSize: '1rem',
  color: '#333',
};

const validateEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) // standard email format
  // && email.endsWith('@gmail.com'); // uncomment for domain restriction

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Retrieve stored user credentials from localStorage
    const savedUser = JSON.parse(localStorage.getItem('mockUser'));
    if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
      setError('Invalid email or password.');
      return;
    }
    setError('');
    onLogin();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f4f7f6',
      padding: '1rem',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '380px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          marginBottom: '1.5rem',
          color: '#333',
          fontWeight: '600',
        }}>Sign In to Your Account</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email Address"
              style={inputStyle}
              required
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              style={inputStyle}
              required
            />
          </div>
          {error && (
            <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.3s',
            }}
          >
            Sign In
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', color: '#666', fontSize: '0.875rem' }}>
          New user? <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
