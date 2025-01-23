import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src="../../public/house_icon.png" alt="Home" className="nav-logo"></img>
      </Link>
      <div className="blank"></div>
      <Link to="#">
        <img src="../../public/closet_icon.png" alt="Home" className="nav-logo"></img>
      </Link>
    </nav>
  );
};

export default Navbar;