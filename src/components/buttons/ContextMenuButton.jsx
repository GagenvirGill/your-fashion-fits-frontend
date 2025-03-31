import React from "react";
import styles from "./ContextMenuButton.module.css";

const ContextMenuButton = ({ text, onClick }) => {
	return (
		<button className={styles.contextMenuButton} onClick={onClick}>
			{text}
		</button>
	);
};

export default ContextMenuButton;
