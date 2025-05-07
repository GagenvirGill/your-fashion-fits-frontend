import React from "react";
import styles from "./AddOutfitForm.module.css";

import CreateTemplate from "./createTemplate/CreateTemplate";

const AddOutfitForm = () => {
	return (
		<div>
			<p className={styles.formTitle}>Outfit Creation Sandbox</p>
			<CreateTemplate />
			<div className={styles.spacer}></div>
		</div>
	);
};

export default AddOutfitForm;
