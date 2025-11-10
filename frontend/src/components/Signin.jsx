import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const inputStyle = { /* ...same as above... */ };

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Dummy "login" handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    } else {
      alert("Enter both fields.");
    }
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
        <h2>Sign In to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email Address"
              style={inputStyle}
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              style={inputStyle}
              required
            />
          </div>
          <button type="submit" /* ... styles ... */>
            Sign In
          </button>
        </form>
        <p>
          New user? <Link to="/signup" /* ... styles ... */>Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
