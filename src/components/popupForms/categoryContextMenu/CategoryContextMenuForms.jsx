import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../ContextMenuPopUpStyles.module.css";

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
				<Button onClick={handleClose} text={"Cancel"} />
				<br />
				<br />
				<p className={styles.title}>{categoryName}</p>
				<AddCategoryToItemsForm
					categoryId={categoryId}
					handleClose={handleClose}
					categoriesCurrItems={categoriesCurrItems}
					categoryName={categoryName}
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
