import React from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

import Button from "../../buttons/Button";
import ItemsCheckboxForm from "../../forms/ItemsCheckboxForm";
import CategoriesCheckboxForm from "../../forms/CategoriesCheckboxForm";

import { filterOutfitsByItem } from "../../../util/Outfits";

const FilterOutfitsByItemForm = ({ handleClose, setDisplayedOutfits }) => {
	const { outfits } = useSelector((state) => state.outfits);
	const [filtCategoryIds, setFiltCategoryIds] = useState([]);

	const handleItemsSubmit = (selectedItemIds) => {
		const newDisplayOutfits = filterOutfitsByItem(outfits, selectedItemIds);
		setDisplayedOutfits(newDisplayOutfits);
		handleClose();
	};

	const handleCategoriesSubmit = (categoryIds) => {
		setFiltCategoryIds(categoryIds);
	};

	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.popupForm}>
				<br />
				<Button onClick={handleClose} text={"Close Form"} />
				<br />
				<p className={styles.formTitle}>Filter Items by Category:</p>
				<CategoriesCheckboxForm
					handleSubmit={handleCategoriesSubmit}
					formId="filter-outfits-category-form"
				/>
				<br />
				<p className={styles.formTitle}>Filter Outfits by Items:</p>
				{filtCategoryIds.length === 0 ? (
					<p className={styles.formTitle}>
						Please Select atleast 1 Category
					</p>
				) : (
					<ItemsCheckboxForm
						handleSubmit={handleItemsSubmit}
						filteringCategoryIds={filtCategoryIds}
					/>
				)}
				<br />
			</div>
		</>
	);
};

export default FilterOutfitsByItemForm;
