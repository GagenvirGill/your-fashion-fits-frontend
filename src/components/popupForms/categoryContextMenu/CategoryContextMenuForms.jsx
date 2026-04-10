"use client";

import React, { useEffect, useState } from "react";
import styles from "../ContextMenuPopUpStyles.module.css";

import { filterItemsByCategories } from "@/api/actions/item";

import Button from "@/components/buttons/Button";
import AddCategoryToItemsForm from "./AddCategoryToItemsForm";
import RemoveCategoryFromItemsForm from "./RemoveCategoryFromItemsForm";

const CategoryContextMenuForms = ({
	categoryId,
	categoryName,
	handleClose,
}) => {
	const [categoriesCurrItems, setCategoriesCurrItems] = useState([]);

	useEffect(() => {
		filterItemsByCategories([categoryId])
			.then((fetchedItems) => {
				setCategoriesCurrItems(fetchedItems);
			})
			.catch((err) => {
				console.log(`Error loading items: ${err}`);
			});
	}, [categoryId]);

	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.popupForm}>
				<br />
				<Button onClick={handleClose} text={"Cancel"} />
				<br />
				<br />
				<p className={styles.title}>{categoryName}</p>
				<AddCategoryToItemsForm
					categoryId={categoryId}
					categoryName={categoryName}
					handleClose={handleClose}
					categoriesCurrItems={categoriesCurrItems}
				/>
				<br />
				<br />
				<RemoveCategoryFromItemsForm
					categoryId={categoryId}
					handleClose={handleClose}
					categoriesCurrItems={categoriesCurrItems}
					categoryName={categoryName}
				/>
				<br />
			</div>
		</>
	);
};

export default CategoryContextMenuForms;
