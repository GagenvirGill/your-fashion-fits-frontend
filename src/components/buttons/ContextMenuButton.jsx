import React from "react";
import styles from "./ContextMenuButton.module.css";

const ContextMenuButton = ({ text, onClick, moreContent }) => {
	return (
		<button className={styles.contextMenuButton} onClick={onClick}>
			{text}
			{moreContent}
		</button>
	);
};

export default ContextMenuButton;
