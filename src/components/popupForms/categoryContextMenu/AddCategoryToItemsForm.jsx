"use client";

import React, { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { itemsAtom } from "@/jotai/itemsAtom";
import { addNotificationAtom } from "@/jotai/notificationsAtom";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useRouter } from "next/navigation";

import { addCategoryToItems } from "@/api/actions/category";

import ItemsCheckboxForm from "@/components/forms/ItemsCheckboxForm";

const AddCategoryToItemsForm = ({
	categoryId,
	handleClose,
	categoriesCurrItems,
	categoryName,
}) => {
	const addNotification = useSetAtom(addNotificationAtom);
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
