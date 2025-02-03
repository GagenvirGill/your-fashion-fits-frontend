import React from "react";
import { Link } from "react-router-dom";
import NavDropdownButton from "./NavDropdownButton";
import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src="/house_icon.png" alt="Home" className={styles.navLogo}></img>
      </Link>
      <div className={styles.blank}></div>
      <Link to="/closet">
        <img src="/hanger_icon.png" alt="closet" className={styles.navLogo}></img>
      </Link>
      <div className={styles.blank}></div>
      <NavDropdownButton buttonId="dropdownButton" imgFileName="/dropdown_icon.png" />
    </nav>
  );
};

export default Navbar;