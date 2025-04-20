import React from "react";
import styles from "./ContextMenuButton.module.css";

const ContextMenuButton = ({ text, onClick, moreContent, disabled }) => {
	return (
		<button
			className={styles.contextMenuButton}
			onClick={onClick}
			disabled={disabled}
		>
			{text}
			{moreContent}
		</button>
	);
};

export default ContextMenuButton;
