"use client";

import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { templateRowsAtom, setBoxCategoriesAtom, setBoxItemAtom } from "@/jotai/outfit-template-atom";
import styles from "../ContextMenuPopUpStyles.module.css";

import Button from "@/components/buttons/Button";
import CategoriesCheckboxForm from "@/components/forms/CategoriesCheckboxForm";

const TemplateCategoriesSelector = ({ rowIndex, boxIndex, setShowForm }) => {
	const templateRows = useAtomValue(templateRowsAtom);
	const setBoxCategories = useSetAtom(setBoxCategoriesAtom);
	const setBoxItem = useSetAtom(setBoxItemAtom);
	const { categories } = templateRows[rowIndex][boxIndex];

	const handleTemplateCategorySubmit = (selectedCategoryIds) => {
		setBoxCategories({
			rowIndex: rowIndex,
			boxIndex: boxIndex,
			categories: selectedCategoryIds,
		});
		setBoxItem({
			rowIndex: rowIndex,
			boxIndex: boxIndex,
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
				<Button onClick={handleClose} text={"Cancel"} />
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
