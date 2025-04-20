import React from "react";
import styles from "./InlineContextMenuButton.module.css";

const InlineContextMenuButton = ({ texts, onClicks }) => {
	return (
		<div className={styles.inlineButtonContainer}>
			{texts.map((text, index) => (
				<button
					key={index}
					className={styles.inlineButton}
					onClick={onClicks[index]}
				>
					{text}
				</button>
			))}
		</div>
	);
};

export default InlineContextMenuButton;
