"use client";

import React from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useSetAtom } from "jotai";
import { addNotificationAtom } from "@/jotai/notificationsAtom";
import { useRouter } from "next/navigation";

import { removeCategoryFromItems } from "@/api/actions/category";

import ItemsCheckboxForm from "@/components/forms/ItemsCheckboxForm";

const RemoveCategoryFromItemsForm = ({
	categoryId,
	handleClose,
	categoriesCurrItems,
	categoryName,
}) => {
	const addNotification = useSetAtom(addNotificationAtom);
	const router = useRouter();

	const handleSubmit = async (selectedItems) => {
		const success = await removeCategoryFromItems(
			categoryId,
			selectedItems
		);
		router.refresh();
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
