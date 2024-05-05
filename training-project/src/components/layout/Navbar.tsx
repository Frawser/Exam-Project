import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Navbar.css"

const Navbar: React.FC = () => {
  console.log("Navbar rendering...");
  return (
    <div className="navbar">
      <Link to="/dashboard" className="nav-item">
        Dashboard
      </Link>
      <Link to="/friendsystem" className="nav-item">
        Friend System
      </Link>
      <Link to="/logworkout" className="nav-item">
        Log Workout
      </Link>
      <Link to="/workoutlist" className="nav-item">
        Workout List
      </Link>
      <Link to="/myprofile" className="nav-item">
        My Profile
      </Link>
    </div>
  );
};

export default Navbar;
