"use client";

import React from "react";
import styles from "./Notifications.module.css";
import { useAtomValue } from "jotai";
import { notificationsAtom } from "@/jotai/notificationsAtom";
import NotificationPopup from "./NotificationPopup";

const Notifications = () => {
	const notifications = useAtomValue(notificationsAtom);

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
