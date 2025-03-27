import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HandleACategoriesItemsForms.module.css";

import { filterItemsByCategories } from "../../../api/Item";

import Button from "../../buttons/Button";
import AddCategoryToItemsForm from "./AddCategoryToItemsForm";
import RemoveCategoryFromItemsForm from "./RemoveCategoryFromItemsForm";

const CategoryContextMenuForms = ({
	categoryId,
	categoryName,
	handleClose,
}) => {
	const dispatch = useDispatch();
	const { refresh } = useSelector((state) => state.items);
	const [categoriesCurrItems, setCategoriesCurrItems] = useState([]);

	useEffect(() => {
		filterItemsByCategories([categoryId])
			.then((fetchedItems) => {
				setCategoriesCurrItems(fetchedItems);
			})
			.catch((err) => {
				console.log(`Error loading items: ${err}`);
			});
	}, [dispatch, refresh]);

	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.popupForm}>
				<br />
				<Button onClick={handleClose} text={"Close Form"} />
				<br />
				<br />
				<p className={styles.categoryTitle}>{categoryName}</p>
				<AddCategoryToItemsForm
					categoryId={categoryId}
					handleClose={handleClose}
					categoriesCurrItems={categoriesCurrItems}
				/>
				<br />
				<br />
				<RemoveCategoryFromItemsForm
					categoryId={categoryId}
					handleClose={handleClose}
					categoriesCurrItems={categoriesCurrItems}
				/>
				<br />
			</div>
		</>
	);
};

export default CategoryContextMenuForms;
