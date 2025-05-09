import React from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { refreshState } from "../../../store/reducers/itemsReducer";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../store/reducers/notificationsReducer";

import { removeItemFromCategories } from "../../../api/Item";

import CategoriesCheckboxForm from "../../forms/CategoriesCheckboxForm";

const RemoveItemFromCategoriesForm = ({
	itemId,
	handleClose,
	itemsCurrCategories,
}) => {
	const dispatch = useDispatch();

	const handleSubmit = async (selectedCategories) => {
		const success = await removeItemFromCategories(
			itemId,
			selectedCategories
		);
		dispatch(refreshState());
		handleClose();

		if (success) {
			dispatch(
				addNotification(
					"Successfully Removed Those Categories from Your Item"
				)
			);
		} else {
			dispatch(
				addNotification(
					"An Error Occured while trying to Remove Item from Categories!"
				)
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
