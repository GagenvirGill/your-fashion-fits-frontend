import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      	<Link to="/">
        	<img src="/house_icon.png" alt="Home" className={styles.navLogo}></img>
      	</Link>
      	<Link to="/closet">
        	<img src="/hanger_icon.png" alt="closet" className={styles.navLogo}></img>
      	</Link>
    </nav>
  );
};

export default Navbar;