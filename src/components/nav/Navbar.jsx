"use client";

import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import ProfilePopup from "./profilePopup/ProfilePopup";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<Link href="/outfits">
				<img
					src="/calendar_icon.png"
					alt="past-outfits"
					className={styles.navLogo}
				/>
			</Link>
			<Link href="/closet">
				<img
					src="/hanger_icon.png"
					alt="closet"
					className={styles.navLogo}
				/>
			</Link>
			<Link href="/">
				<img
					src="/house_icon.png"
					alt="Home"
					className={styles.navLogo}
				/>
			</Link>
			<Link href="/create">
				<img
					src="/plus_icon.png"
					alt="Create"
					className={styles.navLogo}
				/>
			</Link>
			<ProfilePopup />
		</nav>
	);
};

export default Navbar;
