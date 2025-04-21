import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../ContextMenuPopUpStyles.module.css";

import { setBoxItem } from "../../../store/reducers/outfitTemplateReducer";

import Button from "../../buttons/Button";
import ItemsRadioForm from "../../forms/ItemsRadioForm";
import CategoriesCheckboxForm from "../../forms/CategoriesCheckboxForm";

const TemplateItemSelector = ({ gsIndex, setShowForm }) => {
	const dispatch = useDispatch();
	const { templateBoxes } = useSelector((state) => state.outfitTemplate);
	const { itemId } = templateBoxes[gsIndex];

	const [filteringCategoryIds, setFilteringCategoryIds] = useState([]);

	const handleItemSubmit = (selectedItemId, selectedItemImagePath) => {
		dispatch(
			setBoxItem({
				boxIndex: gsIndex,
				itemId: selectedItemId,
				imagePath: selectedItemImagePath,
			})
		);
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
