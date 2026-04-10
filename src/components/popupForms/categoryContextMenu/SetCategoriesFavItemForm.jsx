"use client";

import React from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { setCategoriesFavItem } from "@/api/actions/category";
import { addNotification } from "@/store/reducers/notificationsReducer";

import Button from "@/components/buttons/Button";
import ItemsRadioForm from "@/components/forms/ItemsRadioForm";

const SetCategoriesFavItemForm = ({
	categoryId,
	handleClose,
	currFavItem,
	categoryName,
}) => {
	const dispatch = useDispatch();
	const router = useRouter();

	const handleSubmit = async (selectedItemId) => {
		const success = await setCategoriesFavItem(categoryId, selectedItemId);
		router.refresh();
		handleClose();

		if (success) {
			dispatch(
				addNotification(
					`Successfully Set the Favorite Item of the '${categoryName}' Category!`
				)
			);
		} else {
			dispatch(
				addNotification(
					`An Error Occured Trying to Set the Favorite Item of a Category!`
				)
			);
		}
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
					Select {categoryName}'s' Favorite Item and Screen Saver
				</p>
				<ItemsRadioForm
					handleSubmit={handleSubmit}
					preSelectedItemId={currFavItem}
					formId={"setCategoriesFavItemForm"}
					returnImagePath={false}
					filteringCategoryIds={[categoryId]}
				/>
				<br />
			</div>
		</>
	);
};

export default SetCategoriesFavItemForm;
