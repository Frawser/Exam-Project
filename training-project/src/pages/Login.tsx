import React, { useState, ChangeEvent, FormEvent } from "react";
import "../styles/Login.css";
import backgroundImage from "../assets/images/background.jpg";
import axios from "axios"; 
import { useNavigate } from "react-router";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleBackClick = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setError("");
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);

      navigate('/dashboard'); // Navigate to dashboard on successful login
    } catch (error) {
      setError("Invalid credentials");
    }
  };
  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Send register request to backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username,
          email,
          password,
          nickname,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
  
      // Show login form after successful registration
      setShowLoginForm(true);
      setShowRegisterForm(false);
      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Error registering user");
    }
  };

  return (
    <div className="login-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="content">
        <h2 className="inter-font motivation-q">
          Track Your Progress, Reach Your Peak
        </h2>
        <div className="button-container">
          {!showLoginForm && !showRegisterForm && (
            <div>
              <button className="l-button inter-font" onClick={handleLoginClick}>
                LOGIN
              </button>
              <button className="l-button inter-font" onClick={handleRegisterClick}>
                REGISTER
              </button>
            </div>
          )}
          {showLoginForm && (
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <input
                type="text"
                placeholder="Email..."
                className="input-field inter-font"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <input
                type="password"
                placeholder="Password..."
                className="input-field inter-font"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <button type="submit" className="l-button inter-font">
                LOGIN
              </button>
            </form>
          )}
          {showRegisterForm && (
            <form className="register-form" onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                placeholder="Username..."
                className="input-field inter-font"
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Nickname..."
                className="input-field inter-font"
                value={nickname}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNickname(e.target.value)
                }
              />
              <input
                type="email"
                placeholder="Email..."
                className="input-field inter-font"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <input
                type="password"
                placeholder="Password..."
                className="input-field inter-font"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <button type="submit" className="l-button inter-font">
                REGISTER
              </button>
            </form>
          )}
          {(showLoginForm || showRegisterForm) && (
            <button
              type="button"
              className="b-button inter-font"
              onClick={handleBackClick}
            >
              BACK
            </button>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
