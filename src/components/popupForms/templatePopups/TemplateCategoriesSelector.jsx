import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../ContextMenuPopUpStyles.module.css";

import {
	setBoxCategories,
	setBoxItem,
} from "../../../store/reducers/outfitTemplateReducer";

import Button from "../../buttons/Button";
import CategoriesCheckboxForm from "../../forms/CategoriesCheckboxForm";

const TemplateCategoriesSelector = ({ rowIndex, boxIndex, setShowForm }) => {
	const dispatch = useDispatch();
	const { templateRows } = useSelector((state) => state.outfitTemplate);
	const { categories } = templateRows[rowIndex][boxIndex];

	const handleTemplateCategorySubmit = (selectedCategoryIds) => {
		dispatch(
			setBoxCategories({
				rowIndex: rowIndex,
				boxIndex: boxIndex,
				categories: selectedCategoryIds,
			})
		);
		dispatch(
			setBoxItem({
				rowIndex: rowIndex,
				boxIndex: boxIndex,
				itemId: null,
				imagePath: null,
			})
		);
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
					preSelectedCategoryIds={categories}
					formId={"template-select-categories"}
				/>
				<br />
			</div>
		</>
	);
};

export default TemplateCategoriesSelector;
