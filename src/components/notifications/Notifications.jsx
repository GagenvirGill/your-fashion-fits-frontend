import React from "react";
import styles from "./Notifications.module.css";
import { useSelector } from "react-redux";
import NotificationPopup from "./NotificationPopup";

const Notifications = () => {
	const { notifications } = useSelector((state) => state.notifications);

	return (
		<div className={styles.notificationsContainer}>
			{notifications.map((n) => (
				<NotificationPopup
					key={`notification-${n.id}`}
					id={n.id}
					message={n.message}
				/>
			))}
		</div>
	);
};

export default Notifications;
