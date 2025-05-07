import React, { useEffect, useState } from "react";
import styles from "./Notifications.module.css";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../store/reducers/notificationsReducer";

const NotificationPopup = ({ id, message }) => {
	const dispatch = useDispatch();
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
				dispatch(removeNotification(id));
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
