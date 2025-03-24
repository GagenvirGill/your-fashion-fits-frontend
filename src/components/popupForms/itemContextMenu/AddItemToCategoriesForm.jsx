import React, { useEffect, useState } from "react";
import styles from "./AddItemToCategoriesForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { refreshState } from "../../../store/reducers/itemsReducer";
import { getCategoriesForItem } from "../../../api/Item";

import { addItemToCategories } from "../../../api/Item";
import CategoriesCheckboxForm from "../../forms/CategoriesCheckboxForm";

const AddItemToCategoriesForm = ({ itemId, handleClose }) => {
	const dispatch = useDispatch();
	const { categories, refresh } = useSelector((state) => state.categories);
	const [displayCategories, setDisplayCategories] = useState([]);

	useEffect(() => {
		getCategoriesForItem(itemId)
			.then((fetchedCategories) => {
				const currCategories = new Set();
				fetchedCategories.map((category) => {
					currCategories.add(category.categoryId);
				});

				const filteredCategories = categories.filter((category) => {
					return !currCategories.has(category.categoryId);
				});
				setDisplayCategories(filteredCategories);
			})
			.catch((err) => {
				console.log(`Error loading items: ${err}`);
			});
	}, [dispatch, refresh]);

	const handleSubmit = async (selectedCategories) => {
		await addItemToCategories(itemId, selectedCategories);
		dispatch(refreshState());
		handleClose();
	};

	return (
		<>
			<p className={styles.formTitle}>
				Select Which Categories to Add this Item to
			</p>
			<CategoriesCheckboxForm
				handleSubmit={handleSubmit}
				displayCategories={displayCategories}
			/>
		</>
	);
};

export default AddItemToCategoriesForm;
