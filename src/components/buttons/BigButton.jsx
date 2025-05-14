import React from "react";
import styles from "./BigButton.module.css";

const BigButton = ({ type, text, disable, onClick }) => {
	return (
		<button className={styles.customButton} type={type} onClick={onClick}>
			{text}
		</button>
	);
};

export default BigButton;
