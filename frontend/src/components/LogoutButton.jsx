import React from 'react';

/**
 * A simple, unstyled button component for logging out.
 * It accepts the actual logout logic function via the onLogout prop.
 *
 * @param {function} onLogout - The function to call when the button is clicked.
 */
const LogoutButton = ({ onLogout }) => {
  return (
    <button
      // Execute the function passed from the parent (App.jsx)
      onClick={onLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;