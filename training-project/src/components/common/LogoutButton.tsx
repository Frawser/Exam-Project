import React from "react";
import axios from "axios";
import "../../styles/LogoutButton.css";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button className="logout-btn inter-font" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
