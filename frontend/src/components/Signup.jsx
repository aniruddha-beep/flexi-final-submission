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
  // && email.endsWith('@gmail.com'); // uncomment this line to restrict to gmail only

const SignUp = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Validation logic:
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    // Save credentials to localStorage (mock, demo only! Never do in real apps)
    localStorage.setItem('mockUser', JSON.stringify({ email, password }));
    onSignUp();
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
        }}>Create Your Account</h2>

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
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              style={inputStyle}
              required
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Confirm Password"
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
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.3s',
            }}
          >
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', color: '#666', fontSize: '0.875rem' }}>
          Already have an account? <Link to="/signin" style={{ color: '#007bff', textDecoration: 'none' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
