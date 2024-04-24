import React from 'react';
import "../styles/Login.css";
import backgroundImage from "../assets/images/background.jpg"

const Login = () => {
  return (
    <div className="login-container">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}  />
      <div className="content">
        <h2>Login</h2>
        <div className="button-container">
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
