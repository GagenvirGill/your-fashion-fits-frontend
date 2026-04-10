"use client";

import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { categoriesAtom } from "@/jotai/categoriesAtom";
import CheckboxButton from "../buttons/CheckboxButton";
import Button from "../buttons/Button";
import styles from "./FormStyles.module.css";

const CategoriesCheckboxForm = ({
	handleSubmit,
	displayCategories,
	preSelectedCategoryIds,
	formId,
}) => {
	const allCategories = useAtomValue(categoriesAtom);
	const categories = displayCategories || allCategories;

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
