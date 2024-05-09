import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

//Icon imports
import { FaChartLine } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <Link to="/dashboard" className="nav-item">
        <FaChartLine />
      </Link>
      <Link to="/logworkout" className="nav-item">
        <FaPlusCircle />
      </Link>
      <Link to="/workoutlist" className="nav-item">
        <FaList />
      </Link>
      <Link to="/myprofile" className="nav-item">
        <FaUser />
      </Link>
    </div>
  );
};

export default Navbar;
