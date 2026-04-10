"use client";

import React, { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { itemsAtom } from "@/jotai/items-atom";
import { addNotificationAtom } from "@/jotai/notifications-atom";
import styles from "../ContextMenuPopUpStyles.module.css";
import { addCategoryToItems } from "@/api/actions/category";
import { refetchCategoriesAtom } from "@/jotai/categories-atom";
import { refetchItemsAtom } from "@/jotai/items-atom";

import ItemsCheckboxForm from "@/components/forms/ItemsCheckboxForm";

const AddCategoryToItemsForm = ({
	categoryId,
	handleClose,
	categoriesCurrItems,
	categoryName,
}) => {
	const addNotification = useSetAtom(addNotificationAtom);
	const refetchCategories = useSetAtom(refetchCategoriesAtom);
	const refetchItems = useSetAtom(refetchItemsAtom);
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
		await refetchCategories();
		await refetchItems();
		handleClose();

		if (success) {
			addNotification(
				`Successfully Added Items to the '${categoryName}' Category!`
			);
		} else {
			addNotification(
				`An Error Occured Trying to Add Items to a Category!`
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
