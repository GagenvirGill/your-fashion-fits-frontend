"use client";

import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { itemsAtom } from "@/jotai/itemsAtom";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addNotification } from "@/store/reducers/notificationsReducer";

import { addCategoryToItems } from "@/api/actions/category";

import ItemsCheckboxForm from "@/components/forms/ItemsCheckboxForm";

const AddCategoryToItemsForm = ({
	categoryId,
	handleClose,
	categoriesCurrItems,
	categoryName,
}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const items = useAtomValue(itemsAtom);
	const [filteredItems, setFilteredItems] = useState([]);

	useEffect(() => {
		const currItems = new Set();
		categoriesCurrItems.map((item) => {
			currItems.add(item.itemId);
		});

		const filtItems = items.filter((item) => {
			return !currItems.has(item.itemId);
		});

		setFilteredItems(filtItems);
	}, [items, categoriesCurrItems]);

	const handleSubmit = async (selectedItems) => {
		const success = await addCategoryToItems(categoryId, selectedItems);
		router.refresh();
		handleClose();

		if (success) {
			dispatch(
				addNotification(
					`Successfully Added Items to the '${categoryName}' Category!`
				)
			);
		} else {
			dispatch(
				addNotification(
					`An Error Occured Trying to Add Items to a Category!`
				)
			);
		}
	};

	return (
		<div>
			<p className={styles.formTitle}>
				Select Which Items to Add to this Category
			</p>
			<ItemsCheckboxForm
				handleSubmit={handleSubmit}
				displayItems={filteredItems}
			/>
		</div>
	);
};

export default AddCategoryToItemsForm;
