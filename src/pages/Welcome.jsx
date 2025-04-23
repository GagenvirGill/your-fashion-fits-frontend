import React from "react";
import styles from "./GenericPageStyles.module.css";

const Welcome = () => {
	const handleLogin = () => {
		window.location.href = "http://localhost:5001/auth/google";
	};

	return (
		<div className={styles.pageContainer}>
			<br />
			<p className={styles.pageTitle}>Welcomeeeeeee</p>
			<button onClick={handleLogin}>Login with Google</button>
		</div>
	);
};

export default Welcome;
