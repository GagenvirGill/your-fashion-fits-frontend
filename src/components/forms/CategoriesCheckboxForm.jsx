import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CheckboxButton from "../buttons/CheckboxButton";
import Button from "../buttons/Button";
import styles from "./FormStyles.module.css";

const CategoriesCheckboxForm = ({
	handleSubmit,
	displayCategories,
	preSelectedCategories,
}) => {
	let display_categories;
	if (displayCategories) {
		display_categories = displayCategories;
	} else {
		const { categories } = useSelector((state) => state.categories);
		display_categories = categories;
	}

	const selectedIds = preSelectedCategories.map(
		(category) => category.categoryId
	);
	const [selectedCategories, setSelectedCategories] = useState(
		selectedIds || []
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
		<form className={styles.form} onSubmit={handleCheckboxSubmit}>
			{display_categories.map((category) => (
				<CheckboxButton
					key={category.categoryId}
					text={category.name}
					buttonId={category.categoryId}
					onChange={(event) =>
						handleCheckboxChange(
							category.categoryId,
							event.target.checked
						)
					}
					checked={selectedCategories.includes(category.categoryId)}
				/>
			))}
			<br />
			<div className={styles.spacer}></div>
			<Button type={"submit"} text={"Submit"} />
		</form>
	);
};

export default CategoriesCheckboxForm;
