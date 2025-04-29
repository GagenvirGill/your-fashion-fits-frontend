import React from "react";
import styles from "./GenericPageStyles.module.css";

const Profile = ({ setIsAuthenticated }) => {
	const handleLogin = (e) => {
		e.preventDefault();

		const loginWindow = window.open(
			`${import.meta.env.VITE_BACKEND_URL}/auth/google`,
			"Login with Google",
			`width=${500},height=${400},top=${100},left=${100}`
		);

		const handleMessage = (event) => {
			if (event.origin !== import.meta.env.VITE_BACKEND_URL) {
				console.log("1123");
				return;
			}

			const { token } = event.data;

			if (token) {
				localStorage.setItem("token", token);
				setIsAuthenticated(true);
				window.removeEventListener("message", handleMessage);
			}
		};

		window.addEventListener("message", handleMessage);
	};

	return (
		<div className={styles.pageContainer}>
			<br />
			<p className={styles.pageTitle}>Profileeeee</p>
			<button onClick={handleLogin}>Login with Google</button>
		</div>
	);
};

export default Profile;
