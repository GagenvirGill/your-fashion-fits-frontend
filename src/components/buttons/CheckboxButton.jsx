import React from "react";
import styles from "./CheckboxButton.module.css";

const CheckboxButton = ({ text, buttonId, onChange, checked }) => {
	return (
		<>
			<label className={styles.checkboxButton} htmlFor={buttonId}>
				<input
					type="checkbox"
					id={buttonId}
					onChange={onChange}
					checked={checked}
				/>
				{text}
			</label>
		</>
	);
};

export default CheckboxButton;
