import React from "react";
import styles from "./ImgCheckboxButton.module.css";

const ImgCheckboxButton = ({ imgPath, buttonId, onChange }) => {
	return (
		<>
			<label className={styles.imgCheckboxButton} htmlFor={buttonId}>
				<input type="checkbox" id={buttonId} onChange={onChange} />
				<img
					src={`${"http://localhost:5001"}${imgPath}`}
					alt="Preview"
					id={`${buttonId}-img`}
				/>
			</label>
		</>
	);
};

export default ImgCheckboxButton;
