import React, { useEffect } from "react";
import styles from "./Notifications.module.css";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../store/reducers/notificationsReducer";

const NotificationPopup = ({ id, message }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(removeNotification(id));
		}, 5000);

		return () => clearTimeout(timer);
	}, [dispatch, id]);

	const clickRemoveNotification = (e) => {
		e.preventDefault();

		dispatch(removeNotification(id));
	};

	return (
		<div
			className={styles.notificationPopup}
			onClick={clickRemoveNotification}
		>
			{message}
		</div>
	);
};

export default NotificationPopup;
