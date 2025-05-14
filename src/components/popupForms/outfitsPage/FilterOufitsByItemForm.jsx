import React from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useSelector } from "react-redux";

import Button from "../../buttons/Button";
import ItemsRadioForm from "../../forms/ItemsRadioForm";

import { filterOutfitsByItem } from "../../../util/Outfits";

const FilterOutfitsByItemForm = ({ handleClose, setDisplayedOutfits }) => {
	const { outfits } = useSelector((state) => state.outfits);
	const handleSubmit = async (selectedItemId) => {
		const newDisplayOutfits = filterOutfitsByItem(outfits, selectedItemId);
		setDisplayedOutfits(newDisplayOutfits);
		handleClose();
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
					Show Outfits with a Specific Item
				</p>
				<ItemsRadioForm
					handleSubmit={handleSubmit}
					formId={"filterOutfitsByItemForm"}
					returnImagePath={false}
					filteringCategoryIds={[]}
				/>
				<br />
			</div>
		</>
	);
};

export default FilterOutfitsByItemForm;
