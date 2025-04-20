import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../ContextMenuPopUpStyles.module.css";

import Button from "../../buttons/Button";
import ItemsRadioForm from "../../forms/ItemsRadioForm";
import CategoriesCheckboxForm from "../../forms/CategoriesCheckboxForm";

const TemplateCategoriesSelector = ({
	setCurrentItem,
	setSelectedCategories,
	preSelectedCategories,
	setShowForm,
}) => {
	const { categories } = useSelector((state) => state.categories);

	const [templateCategoryIds, setTemplateCategoryIds] = useState(
		preSelectedCategories.map((category) => category.categoryId)
	);

	const handleTemplateCategorySubmit = (selectedCategoryIds) => {
		const selectedCategoryIdsSet = new Set(selectedCategoryIds);

		const selectedCategories = categories.filter((category) =>
			selectedCategoryIdsSet.has(category.categoryId)
		);
		setSelectedCategories(selectedCategories);
		setTemplateCategoryIds(selectedCategoryIds);
		setCurrentItem({
			itemId: null,
			imagePath: null,
		});
		handleClose();
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
				<p className={styles.formTitle}>
					Select Categories For Randomization
				</p>
				<CategoriesCheckboxForm
					handleSubmit={handleTemplateCategorySubmit}
					preSelectedCategoryIds={templateCategoryIds}
					formId={"template-select-categories"}
				/>
				<br />
			</div>
		</>
	);
};

export default TemplateCategoriesSelector;
