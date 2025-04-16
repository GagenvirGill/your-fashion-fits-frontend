import React from "react";
import { useSelector } from "react-redux";
import styles from "../ContextMenuPopUpStyles.module.css";

import Button from "../../buttons/Button";
import ItemsRadioForm from "../../forms/ItemsRadioForm";
import CategoriesCheckboxForm from "../../forms/CategoriesCheckboxForm";

const TemplateBoxForm = ({
	setCurrentItem,
	setSelectedCategories,
	preSelectedCategories,
	setshowForm,
}) => {
	const { categories } = useSelector((state) => state.categories);

	const handleItemSubmit = (selectedItemId, selectedItemImagePath) => {
		setCurrentItem({
			itemId: selectedItemId,
			imagePath: selectedItemImagePath,
		});
		handleClose();
	};

	const handleCategorySubmit = (selectedCategoryIds) => {
		const selectedCategoryIdsSet = new Set(selectedCategoryIds);

		const selectedCategories = categories.filter((category) =>
			selectedCategoryIdsSet.has(category.categoryId)
		);
		setSelectedCategories(selectedCategories);
		setCurrentItem({
			itemId: null,
			imagePath: null,
		});
	};

	const handleClose = () => {
		setshowForm(false);
	};

	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.popupForm}>
				<br />
				<Button onClick={handleClose} text={"Close Form"} />
				<br />
				<br />
				<p className={styles.formTitle}>
					Select Categories For Filtering AND Randomization
				</p>
				<CategoriesCheckboxForm
					handleSubmit={handleCategorySubmit}
					preSelectedCategories={preSelectedCategories}
				/>
				<br />
				<br />
				<p className={styles.formTitle}>Select Item</p>
				<ItemsRadioForm
					handleSubmit={handleItemSubmit}
					preSelectedItemId={null}
					formId={"template-select-item"}
					returnImagePath={true}
				/>
				<br />
			</div>
		</>
	);
};

export default TemplateBoxForm;
