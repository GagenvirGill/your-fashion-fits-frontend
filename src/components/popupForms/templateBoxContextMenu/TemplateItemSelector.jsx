import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../ContextMenuPopUpStyles.module.css";

import Button from "../../buttons/Button";
import ItemsRadioForm from "../../forms/ItemsRadioForm";
import CategoriesCheckboxForm from "../../forms/CategoriesCheckboxForm";

const TemplateItemSelector = ({ setCurrentItem, setShowForm, currentItem }) => {
	const [filteringCategoryIds, setFilteringCategoryIds] = useState([]);

	const handleItemSubmit = (selectedItemId, selectedItemImagePath) => {
		setCurrentItem({
			itemId: selectedItemId,
			imagePath: selectedItemImagePath,
		});
		handleClose();
	};

	const handleFilteringCategorySubmit = (selectedCategoryIds) => {
		setFilteringCategoryIds(selectedCategoryIds);
	};

	const handleClose = () => {
		setShowForm(false);
	};

	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.popupForm}>
				<br />
				<Button onClick={handleClose} text={"Close Form"} />
				<br />
				<br />
				<p className={styles.formTitle}>Select Item with Filtering</p>
				<CategoriesCheckboxForm
					handleSubmit={handleFilteringCategorySubmit}
					preSelectedCategoryIds={filteringCategoryIds}
					formId={"template-item-filtering-categories"}
				/>
				<br />
				<br />
				<ItemsRadioForm
					handleSubmit={handleItemSubmit}
					preSelectedItemId={currentItem && currentItem.itemId}
					formId={"template-select-item"}
					returnImagePath={true}
					filteringCategoryIds={filteringCategoryIds}
				/>
				<br />
			</div>
		</>
	);
};

export default TemplateItemSelector;
