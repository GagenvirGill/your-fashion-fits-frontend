import React from "react";
import styles from "../ContextMenuPopUpStyles.module.css";

import Button from "../../buttons/Button";
import FilterItemsForm from "../../forms/FilterItemsForm";

const ItemsPopupFilterForm = ({ handleClose, setSelectedCategories }) => {
	const handleSubmit = async (selCategories) => {
		setSelectedCategories(selCategories);
		handleClose();
	};

	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.popupForm}>
				<br />
				<Button onClick={handleClose} text={"Cancel"} />
				<br />
				<br />
				<p className={styles.formTitle}>
					Filter Your Items by their Categories
				</p>
				<FilterItemsForm handleSubmit={handleSubmit} />
				<br />
			</div>
		</>
	);
};

export default ItemsPopupFilterForm;
