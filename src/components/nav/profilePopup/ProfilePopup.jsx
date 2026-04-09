"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import styles from "./ProfilePopup.module.css";

import ImgButton from "../../buttons/ImgButton";
import InlineContextMenuButton from "../../buttons/InlineContextMenuButton";

const ProfilePopup = () => {
	const [isPopupVisible, setPopupVisibility] = useState(false);
	const { data: session } = useSession();

	const handleButtonChange = () => {
		setPopupVisibility(!isPopupVisible);
	};

	const handleLogout = (e) => {
		e.preventDefault();
		setPopupVisibility(false);
		signOut({ callbackUrl: "/" });
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
						{session?.user?.email ?? "You are not Logged in"}
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
