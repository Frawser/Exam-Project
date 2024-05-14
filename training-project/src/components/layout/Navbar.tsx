import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Navbar.css";
import "../../styles/App.css";

//Icon imports
import { FaChartLine, FaPlusCircle, FaList, FaUser } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleBodyClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".burger-menu")) {
        setIsMenuOpen(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav className="navbar inter-font">
        <Link
          to="/dashboard"
          className={`nav-item ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
          onClick={handleLinkClick}
        >
          <FaChartLine />
        </Link>
        <Link
          to="/logworkout"
          className={`nav-item ${
            location.pathname === "/logworkout" ? "active" : ""
          }`}
          onClick={handleLinkClick}
        >
          <FaPlusCircle />
        </Link>
        <Link
          to="/workoutlist"
          className={`nav-item ${
            location.pathname === "/workoutlist" ? "active" : ""
          }`}
          onClick={handleLinkClick}
        >
          <FaList />
        </Link>
        <Link
          to="/myprofile"
          className={`nav-item ${
            location.pathname === "/myprofile" ? "active" : ""
          }`}
          onClick={handleLinkClick}
        >
          <FaUser />
        </Link>
      </nav>
      <div className={`burger-menu ${isMenuOpen ? "open" : ""}`}>
        <span className="burger-icon" onClick={toggleMenu}>
          &#9776;
        </span>
        <span className="app-name inter-font">GymTracker Guild</span>
        <div className="burger-dropdown inter-font">
          <Link
            to="/dashboard"
            className={`nav-item ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
            onClick={handleLinkClick}
          >
            Dashboard
          </Link>
          <Link
            to="/logworkout"
            className={`nav-item ${
              location.pathname === "/logworkout" ? "active" : ""
            }`}
            onClick={handleLinkClick}
          >
            Log Workout
          </Link>
          <Link
            to="/workoutlist"
            className={`nav-item ${
              location.pathname === "/workoutlist" ? "active" : ""
            }`}
            onClick={handleLinkClick}
          >
            Workout List
          </Link>
          <Link
            to="/myprofile"
            className={`nav-item ${
              location.pathname === "/myprofile" ? "active" : ""
            }`}
            onClick={handleLinkClick}
          >
            My Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
