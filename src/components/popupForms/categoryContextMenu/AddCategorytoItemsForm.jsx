import React, { useEffect, useState } from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { refreshState } from "../../../store/reducers/categoriesReducer";
import { addNotification } from "../../../store/reducers/notificationsReducer";

import { addCategoryToItems } from "../../../api/Category";

import ItemsCheckboxForm from "../../forms/ItemsCheckboxForm";

const AddCategoryToItemsForm = ({
	categoryId,
	handleClose,
	categoriesCurrItems,
	categoryName,
}) => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.items);
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
		dispatch(refreshState());
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
