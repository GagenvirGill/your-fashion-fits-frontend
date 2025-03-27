import React from "react";
import styles from "./ImgRadioButton.module.css";

const ImgRadioButton = ({
	buttonId,
	imgPath,
	isSelected,
	onChange,
	formId,
}) => {
	return (
		<label className={styles.imgRadioButton}>
			<input
				type="radio"
				id={buttonId}
				checked={isSelected}
				onChange={onChange}
				name={formId}
			/>
			<img
				src={`${"http://localhost:5001"}${imgPath}`}
				alt="Preview"
				id={`${buttonId}-${formId}-img`}
			/>
		</label>
	);
};

export default ImgRadioButton;
