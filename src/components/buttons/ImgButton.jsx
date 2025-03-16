import React from "react";
import styles from "./ImgButton.module.css";

const ImgButton = ({ buttonId, imgFileName, onChange, className }) => {
	let chosenImgStyles;

	if (className) {
		chosenImgStyles = `${className} ${styles.imgIcon}`;
	} else {
		chosenImgStyles = styles.imgIcon;
	}

	return (
		<label className={styles.imgBtn} htmlFor={buttonId}>
			<input type="checkbox" id={buttonId} onChange={onChange} />
			<img
				src={imgFileName}
				alt={buttonId}
				className={chosenImgStyles}
			></img>
		</label>
	);
};

export default ImgButton;
