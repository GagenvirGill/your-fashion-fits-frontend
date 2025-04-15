import React from "react";
import styles from "../ContextMenuPopUpStyles.module.css";

import Button from "../../buttons/Button";
import ItemsRadioForm from "../../forms/ItemsRadioForm";

const SelectItemForm = ({ setCurrentItem, setShowItemForm }) => {
	const handleSubmit = (selectedItemId, selectedItemImagePath) => {
		setCurrentItem({
			itemId: selectedItemId,
			imagePath: selectedItemImagePath,
		});
		handleClose();
	};

	const handleClose = () => {
		setShowItemForm(false);
	};

	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.popupForm}>
				<br />
				<Button onClick={handleClose} text={"Close Form"} />
				<br />
				<br />
				<p className={styles.formTitle}>Select Item</p>
				<ItemsRadioForm
					handleSubmit={handleSubmit}
					preSelectedItemId={null}
					formId={"template-select-item"}
					returnImagePath={true}
				/>
				<br />
			</div>
		</>
	);
};

export default SelectItemForm;
