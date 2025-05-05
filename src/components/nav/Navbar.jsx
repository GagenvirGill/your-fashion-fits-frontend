import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<Link to="/outfits">
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
			<Link to="/home">
				<img
					src="/house_icon.png"
					alt="Home"
					className={styles.navLogo}
				></img>
			</Link>
			<Link to="/create">
				<img
					src="/plus_icon.png"
					alt="Create"
					className={styles.navLogo}
				></img>
			</Link>
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
