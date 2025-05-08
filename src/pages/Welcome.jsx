import React from "react";
import styles from "./GenericPageStyles.module.css";
import Button from "../components/buttons/Button";
import YoutubeEmbed from "../components/video/YoutubeEmbed";

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

		const loginWindow = window.open(
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
				loginWindow.close();
				window.removeEventListener("message", handleMessage);
			}
		};

		window.addEventListener("message", handleMessage);
	};

	return (
		<div className={styles.pageContainer}>
			<div className={styles.pageTitle}>Welcome to Your Fashion Fits</div>
			<div className={styles.pageText}>
				{isAuthenticated && payload
					? `Hello ${payload.email}`
					: "Please Log In"}
			</div>
			{isAuthenticated && payload ? (
				<Button onClick={handleLogin} text="Switch Accounts" />
			) : (
				<Button onClick={handleLogin} text="Login with Google" />
			)}
			<br />
			<br />
			<br />
			<div className={styles.column}>
				<div className={styles.pageTitle}>Demo & Tutorial</div>
				<div className={styles.pageText}>
					Hello there, if your new to YFF (Your Fashion Fits), I've
					created a short demo and tutorial video to show you the
					different features!
				</div>
				<div className={styles.pageText}>
					Note: If the video below is Never Gonna Give You Up... then
					the video is coming soon! (sorry)
				</div>
				<YoutubeEmbed ytVideoId={"dQw4w9WgXcQ"} />
				<div className={styles.pageText}>
					For if you don't feel like watching the video, heres a quick
					rundown. Your Fashion Fits' goal is to help you better
					manage your closet, plan your outfits, and most importantly
					try out new styles. YFF allows you to upload all (or just
					some) of your fashion pieces, categorize them, and then
					filter through them based on your unique categories. In this
					way YFF allows for full customization, YOU decide how to
					organize your clothes into categories to best suit YOUR
					needs. Finally, with the outfit creation sandbox, you can
					easily create outfits when you have ideas in mind, or you
					can use the randomization feature to randomly select items
					to show you new styles, give you inspiration, and also even
					show you clothes you forgot you had!
				</div>

				<div className={styles.spacer}></div>

				<div className={styles.pageTitle}>
					Behind the Scenes - Technical
				</div>
				<div className={styles.pageText}>
					Now if you're a more technically inclined individual, and
					you're curious about whats going on behind the scenes, you
					can check out the source code here:
				</div>
				<div className={styles.pageText}>
					<a href="https://github.com/GagenvirGill/your-fashion-fits-frontend">
						Frontend Repository
					</a>
					<a href="https://github.com/GagenvirGill/your-fashion-fits-backend">
						Backend Repository
					</a>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
