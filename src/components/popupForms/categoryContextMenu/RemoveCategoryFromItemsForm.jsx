import React from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { refreshState } from "../../../store/reducers/categoriesReducer";
import { addNotification } from "../../../store/reducers/notificationsReducer";
import { useDispatch } from "react-redux";

import { removeCategoryFromItems } from "../../../api/Category";

import ItemsCheckboxForm from "../../forms/ItemsCheckboxForm";

const RemoveCategoryFromItemsForm = ({
	categoryId,
	handleClose,
	categoriesCurrItems,
	categoryName,
}) => {
	const dispatch = useDispatch();

	const handleSubmit = async (selectedItems) => {
		const success = await removeCategoryFromItems(
			categoryId,
			selectedItems
		);
		dispatch(refreshState());
		handleClose();

		if (success) {
			dispatch(
				addNotification(
					`Successfully Removed Items from the '${categoryName}' Category!`
				)
			);
		} else {
			dispatch(
				addNotification(
					`An Error Occured Trying to Remove Items from a Category!`
				)
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
