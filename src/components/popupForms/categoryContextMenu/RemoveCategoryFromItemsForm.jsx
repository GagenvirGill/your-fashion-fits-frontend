import React from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { refreshState } from "../../../store/reducers/categoriesReducer";
import { useDispatch } from "react-redux";

import { removeCategoryFromItems } from "../../../api/Category";

import ItemsCheckboxForm from "../../forms/ItemsCheckboxForm";

const RemoveCategoryFromItemsForm = ({
	categoryId,
	handleClose,
	categoriesCurrItems,
}) => {
	const dispatch = useDispatch();

	const handleSubmit = async (selectedItems) => {
		await removeCategoryFromItems(categoryId, selectedItems);
		dispatch(refreshState());
		handleClose();
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
