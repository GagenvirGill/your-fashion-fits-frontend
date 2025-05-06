import React, { useState } from "react";
import styles from "./ProfilePopup.module.css";

import ImgButton from "../../buttons/ImgButton";
import InlineContextMenuButton from "../../buttons/InlineContextMenuButton";

const ProfilePopup = ({ setIsAuthenticated }) => {
	const [isPopupVisible, setPopupVisibility] = useState(false);

	const token = localStorage.getItem("token");

	let payload = null;
	if (token) {
		try {
			payload = JSON.parse(atob(token.split(".")[1]));
		} catch (error) {
			console.error("Invalid token format:", error);
		}
	}

	const handleButtonChange = () => {
		setPopupVisibility(!isPopupVisible);
	};

	const handleLogout = (e) => {
		e.preventDefault();

		setPopupVisibility(false);
		setIsAuthenticated(false);
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	return (
		<div className={styles.popupContainer}>
			<ImgButton
				buttonId="profile-popup-button"
				imgFileName="/profile_icon.png"
				onChange={handleButtonChange}
			/>

			{isPopupVisible && (
				<div className={styles.popupContent}>
					<p className={styles.emailText}>
						{payload ? payload.email : "You are not Logged in"}
					</p>
					<InlineContextMenuButton
						texts={["Logout"]}
						onClicks={[handleLogout]}
					/>
				</div>
			)}
		</div>
	);
};

export default ProfilePopup;
