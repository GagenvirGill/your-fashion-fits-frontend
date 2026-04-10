"use client";

import React, { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { templateRowsAtom, setWholeTemplateAtom } from "@/jotai/outfit-template-atom";
import styles from "../ContextMenuPopUpStyles.module.css";
import { updateTemplateWithScales } from "@/lib/item-ratios";

import Button from "@/components/buttons/Button";
import ItemsRadioForm from "@/components/forms/ItemsRadioForm";
import CategoriesCheckboxForm from "@/components/forms/CategoriesCheckboxForm";

const TemplateItemSelector = ({
	rowIndex,
	boxIndex,
	setShowForm,
	ratiosMatrix,
}) => {
	const templateRows = useAtomValue(templateRowsAtom);
	const setWholeTemplate = useSetAtom(setWholeTemplateAtom);
	const { itemId } = templateRows[rowIndex][boxIndex];

	const [filteringCategoryIds, setFilteringCategoryIds] = useState([]);

	const handleItemSubmit = (selectedItemId, selectedItemImagePath) => {
		const newRows = templateRows.map((row) => [...row]);

		newRows[rowIndex][boxIndex] = {
			...newRows[rowIndex][boxIndex],
			itemId: selectedItemId,
			imagePath: selectedItemImagePath,
		};

		const updatedRows = updateTemplateWithScales(
			newRows,
			ratiosMatrix,
			newRows
		);

		setWholeTemplate({ newTemplate: updatedRows });

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
				<Button onClick={handleClose} text={"Cancel"} />
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
					preSelectedItemId={itemId}
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
