"use client";

import React, { useState, useEffect } from "react";
import { getAllCategories } from "@/api/actions/category";
import CheckboxButton from "../buttons/CheckboxButton";
import Button from "../buttons/Button";
import styles from "./FormStyles.module.css";

const CategoriesCheckboxForm = ({
	handleSubmit,
	displayCategories,
	preSelectedCategoryIds,
	formId,
}) => {
	const [categories, setCategories] = useState(displayCategories || []);

	useEffect(() => {
		if (!displayCategories) {
			getAllCategories()
				.then(setCategories)
				.catch((err) => console.log(`Error loading categories: ${err}`));
		}
	}, [displayCategories]);

	const [selectedCategories, setSelectedCategories] = useState(
		preSelectedCategoryIds || []
	);

	const handleCheckboxChange = (categoryId, checked) => {
		setSelectedCategories((prevState) => {
			if (checked) {
				return [...prevState, categoryId];
			} else {
				return prevState.filter((idVal) => idVal !== categoryId);
			}
		});
	};

	const handleCheckboxSubmit = async (event) => {
		event.preventDefault();
		handleSubmit(selectedCategories);
	};

	return (
		<form
			id={formId}
			className={styles.form}
			onSubmit={handleCheckboxSubmit}
		>
			{categories.map((category) => (
				<CheckboxButton
					key={`${formId}-${category.categoryId}`}
					text={category.name}
					buttonId={`${formId}-${category.categoryId}`}
					onChange={(event) =>
						handleCheckboxChange(
							category.categoryId,
							event.target.checked
						)
					}
					checked={
						selectedCategories &&
						selectedCategories.includes(category.categoryId)
					}
				/>
			))}
			<br />
			<div className={styles.spacer}></div>
			<Button type={"submit"} text={"Submit"} />
		</form>
	);
};

export default CategoriesCheckboxForm;
