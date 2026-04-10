"use client";

import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { categoriesAtom } from "@/jotai/categoriesAtom";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addNotification } from "@/store/reducers/notificationsReducer";

import { addItemToCategories } from "@/api/actions/item";

import CategoriesCheckboxForm from "@/components/forms/CategoriesCheckboxForm";

const AddItemToCategoriesForm = ({
	itemId,
	handleClose,
	itemsCurrCategories,
}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const categories = useAtomValue(categoriesAtom);
	const [filteredCategories, setFilteredCategories] = useState([]);

	useEffect(() => {
		const currCategories = new Set();
		itemsCurrCategories.map((category) => {
			currCategories.add(category.categoryId);
		});

		const filtCategories = categories.filter((category) => {
			return !currCategories.has(category.categoryId);
		});

		setFilteredCategories(filtCategories);
	}, [categories, itemsCurrCategories]);

	const handleSubmit = async (selectedCategories) => {
		const success = await addItemToCategories(itemId, selectedCategories);
		router.refresh();
		handleClose();

		if (success) {
			dispatch(
				addNotification(
					"Successfully Added Those Categories to Your Item"
				)
			);
		} else {
			dispatch(
				addNotification(
					"An Error Occured while trying to Add Item to Categories!"
				)
			);
		}
	};

	return (
		<>
			<p className={styles.formTitle}>
				Select Which Categories to Add this Item to
			</p>
			<CategoriesCheckboxForm
				formId="AddItemToCategoriesForm"
				handleSubmit={handleSubmit}
				displayCategories={filteredCategories}
			/>
		</>
	);
};

export default AddItemToCategoriesForm;
