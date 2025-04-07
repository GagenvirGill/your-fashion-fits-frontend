import React from "react";
import styles from "./RemoveItemsFromOutfitForm.module.css";
import { refreshState } from "../../../store/reducers/outfitsReducer";
import { useDispatch } from "react-redux";

import { removeItemsFromOutfit } from "../../../api/Outfit";

import ItemsCheckboxForm from "../../forms/ItemsCheckboxForm";

const RemoveItemsFromOutfitForm = ({
	outfitId,
	handleClose,
	outfitsCurrItems,
}) => {
	const dispatch = useDispatch();

	const handleSubmit = async (selectedItems) => {
		await removeItemsFromOutfit(outfitId, selectedItems);
		dispatch(refreshState());
		handleClose();
	};

	return (
		<div>
			<p className={styles.formTitle}>
				Select Which Items to Remove from this Outfit
			</p>
			<ItemsCheckboxForm
				handleSubmit={handleSubmit}
				displayItems={outfitsCurrItems}
			/>
		</div>
	);
};

export default RemoveItemsFromOutfitForm;
