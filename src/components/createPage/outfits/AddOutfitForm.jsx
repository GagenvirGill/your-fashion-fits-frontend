"use client";

import React from "react";
import styles from "./AddOutfitForm.module.css";

import CreateTemplate from "./createTemplate/CreateTemplate";

const AddOutfitForm = ({ outfits }) => {
	return (
		<div className={styles.formContainer}>
			<p className={styles.formTitle}>Outfit Creation Sandbox</p>
			<CreateTemplate outfits={outfits} />
			<div className={styles.spacer}></div>
		</div>
	);
};

export default AddOutfitForm;
