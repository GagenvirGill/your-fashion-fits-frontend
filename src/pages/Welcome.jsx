import React from "react";
import styles from "./GenericPageStyles.module.css";

const Welcome = ({ setIsAuthenticated }) => {
	const handleLogin = (e) => {
		e.preventDefault();

		window.open(
			`${import.meta.env.VITE_BACKEND_URL}/auth/google`,
			"Login with Google",
			`width=${500},height=${400},top=${100},left=${100}`
		);

		const handleMessage = (event) => {
			const backendOrigin = new URL(import.meta.env.VITE_BACKEND_URL)
				.origin;

			if (event.origin !== backendOrigin) {
				return;
			}

			const { token } = event.data;

			if (token) {
				localStorage.setItem("token", token);
				window.location.href = "/";
				setIsAuthenticated(true);
				window.removeEventListener("message", handleMessage);
			}
		};

		window.addEventListener("message", handleMessage);
	};

	return (
		<div className={styles.pageContainer}>
			<br />
			<p className={styles.pageTitle}>Welcome to your Closet</p>
			<button onClick={handleLogin}>Login with Google</button>
		</div>
	);
};

export default Welcome;
