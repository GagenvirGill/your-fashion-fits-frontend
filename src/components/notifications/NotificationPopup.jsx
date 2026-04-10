"use client";

import React, { useEffect, useState } from "react";
import styles from "./Notifications.module.css";
import { useSetAtom } from "jotai";
import { removeNotificationAtom } from "@/jotai/notificationsAtom";

const NotificationPopup = ({ id, message }) => {
	const removeNotification = useSetAtom(removeNotificationAtom);
	const [exiting, setExiting] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setExiting(true);
		}, 7200);

		return () => clearTimeout(timer);
	}, [dispatch, id]);

	useEffect(() => {
		if (exiting) {
			const timer = setTimeout(() => {
				removeNotification(id);
			}, 300);

			return () => clearTimeout(timer);
		}
	}, [exiting, dispatch, id]);

	const clickRemoveNotification = (e) => {
		e.preventDefault();

		setExiting(true);
	};

	return (
		<div
			className={`${styles.notificationPopup} ${
				exiting ? styles.slidingOut : ""
			}`}
			onClick={clickRemoveNotification}
		>
			{message}
		</div>
	);
};

export default NotificationPopup;
