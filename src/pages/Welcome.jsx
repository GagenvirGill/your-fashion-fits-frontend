import React from "react";
import styles from "./GenericPageStyles.module.css";
import Button from "../components/buttons/Button";

const Welcome = ({ setIsAuthenticated, isAuthenticated }) => {
	const token = localStorage.getItem("token");

	let payload = null;
	if (token) {
		try {
			payload = JSON.parse(atob(token.split(".")[1]));
		} catch (error) {
			console.error("Invalid token format:", error);
		}
	}

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
			<p className={styles.pageText}>
				{isAuthenticated && payload
					? `Hello ${payload.email}`
					: "Please Log In"}
			</p>
			<p className={styles.pageTitle}>Welcome to Your Fashion Fits</p>
			<Button onClick={handleLogin} text="Login with Google" />
		</div>
	);
};

export default Welcome;
