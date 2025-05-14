import React from "react";
import styles from "../ContextMenuPopUpStyles.module.css";

import Button from "../../buttons/Button";

const AreYouSureForm = ({ handleConfirm, handleCancel, type, children }) => {
	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.popupForm}>
				<br />
				<div className={styles.formTitle}>
					Are you sure you want to delete the {type}?
				</div>
				<br />
				<Button onClick={handleCancel} text="CANCEL" />
				<Button onClick={handleConfirm} text="CONFIRM" />
				<br />
				<br />
				{children}
				<br />
			</div>
		</>
	);
};

export default AreYouSureForm;
