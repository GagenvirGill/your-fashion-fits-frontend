import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import NavAddMenu from "../popupForms/navAddMenu/NavAddMenu";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<Link to="/past-outfits">
				<img
					src="/calendar_icon.png"
					alt="past-outfits"
					className={styles.navLogo}
				></img>
			</Link>
			<Link to="/closet">
				<img
					src="/hanger_icon.png"
					alt="closet"
					className={styles.navLogo}
				></img>
			</Link>
			<Link to="/">
				<img
					src="/house_icon.png"
					alt="Home"
					className={styles.navLogo}
				></img>
			</Link>
			<NavAddMenu />
			<Link to="/profile">
				<img
					src="/profile_icon.png"
					alt="profile"
					className={styles.navLogo}
				></img>
			</Link>
		</nav>
	);
};

export default Navbar;
