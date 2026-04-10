"use client";

import React from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useSetAtom } from "jotai";
import { addNotificationAtom } from "@/jotai/notificationsAtom";
import { removeItemFromCategories } from "@/api/actions/item";
import { refetchItemsAtom } from "@/jotai/itemsAtom";
import { refetchCategoriesAtom } from "@/jotai/categoriesAtom";

import CategoriesCheckboxForm from "@/components/forms/CategoriesCheckboxForm";

const RemoveItemFromCategoriesForm = ({
	itemId,
	handleClose,
	itemsCurrCategories,
}) => {
	const addNotification = useSetAtom(addNotificationAtom);
	const refetchItems = useSetAtom(refetchItemsAtom);
	const refetchCategories = useSetAtom(refetchCategoriesAtom);
	const handleSubmit = async (selectedCategories) => {
		const success = await removeItemFromCategories(
			itemId,
			selectedCategories
		);
		await refetchItems();
		await refetchCategories();
		handleClose();

		if (success) {
			addNotification(
				"Successfully Removed Those Categories from Your Item"
			);
		} else {
			addNotification(
				"An Error Occured while trying to Remove Item from Categories!"
			);
		}
	};

	return (
		<>
			<p className={styles.formTitle}>
				Select Which Categories to Remove this Item from
			</p>
			<CategoriesCheckboxForm
				formId="RemoveItemFromCategoriesForm"
				handleSubmit={handleSubmit}
				displayCategories={itemsCurrCategories}
			/>
		</>
	);
};

export default RemoveItemFromCategoriesForm;
