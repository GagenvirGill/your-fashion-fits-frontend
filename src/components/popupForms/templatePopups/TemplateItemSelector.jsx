import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../ContextMenuPopUpStyles.module.css";
import { updateTemplateWithScales } from "../../../util/itemRatios";

import { setWholeTemplate } from "../../../store/reducers/outfitTemplateReducer";

import Button from "../../buttons/Button";
import ItemsRadioForm from "../../forms/ItemsRadioForm";
import CategoriesCheckboxForm from "../../forms/CategoriesCheckboxForm";

const TemplateItemSelector = ({
	rowIndex,
	boxIndex,
	setShowForm,
	ratiosMatrix,
}) => {
	const dispatch = useDispatch();
	const { templateRows } = useSelector((state) => state.outfitTemplate);
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

		dispatch(setWholeTemplate({ newTemplate: updatedRows }));

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
