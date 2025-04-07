import React, { useEffect, useState } from "react";
import styles from "./AddItemsToOutfitForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { refreshState } from "../../../store/reducers/outfitsReducer";

import { addItemsToOutfit } from "../../../api/Outfit";

import ItemsCheckboxForm from "../../forms/ItemsCheckboxForm";

const AddItemsToOutfitForm = ({ outfitId, handleClose, outfitsCurrItems }) => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.items);
	const [filteredItems, setFilteredItems] = useState([]);

	useEffect(() => {
		const currItems = new Set();
		outfitsCurrItems.map((item) => {
			currItems.add(item.itemId);
		});

		const filtItems = items.filter((item) => {
			return !currItems.has(item.itemId);
		});

		setFilteredItems(filtItems);
	}, [items, outfitsCurrItems]);

	const handleSubmit = async (selectedItems) => {
		await addItemsToOutfit(outfitId, selectedItems);
		dispatch(refreshState());
		handleClose();
	};

	return (
		<div>
			<p className={styles.formTitle}>
				Select Which Items to Add to this Outfit
			</p>
			<ItemsCheckboxForm
				handleSubmit={handleSubmit}
				displayItems={filteredItems}
			/>
		</div>
	);
};

export default AddItemsToOutfitForm;
