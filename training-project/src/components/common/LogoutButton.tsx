import React from 'react';
import axios from 'axios';

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      // Send a request to the logout endpoint
      await axios.post('http://localhost:5000/api/auth/logout');

      // Clear user session or token from local storage
      localStorage.removeItem('token'); // Assuming you store the token in localStorage

      // Redirect to the login page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);

    }
  };

  return <button className="logout-btn inter-font" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
