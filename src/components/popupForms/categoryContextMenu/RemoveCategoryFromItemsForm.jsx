"use client";

import React from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useSetAtom } from "jotai";
import { addNotificationAtom } from "@/jotai/notifications-atom";
import { removeCategoryFromItems } from "@/api/actions/category";
import { refetchCategoriesAtom } from "@/jotai/categories-atom";
import { refetchItemsAtom } from "@/jotai/items-atom";

import ItemsCheckboxForm from "@/components/forms/ItemsCheckboxForm";

const RemoveCategoryFromItemsForm = ({
	categoryId,
	handleClose,
	categoriesCurrItems,
	categoryName,
}) => {
	const addNotification = useSetAtom(addNotificationAtom);
	const refetchCategories = useSetAtom(refetchCategoriesAtom);
	const refetchItems = useSetAtom(refetchItemsAtom);
	const handleSubmit = async (selectedItems) => {
		const success = await removeCategoryFromItems(
			categoryId,
			selectedItems
		);
		await refetchCategories();
		await refetchItems();
		handleClose();

		if (success) {
			addNotification(
				`Successfully Removed Items from the '${categoryName}' Category!`
			);
		} else {
			addNotification(
				`An Error Occured Trying to Remove Items from a Category!`
			);
		}
	};

	return (
		<div>
			<p className={styles.formTitle}>
				Select Which Items to Remove from this Category
			</p>
			<ItemsCheckboxForm
				handleSubmit={handleSubmit}
				displayItems={categoriesCurrItems}
			/>
		</div>
	);
};

export default RemoveCategoryFromItemsForm;
