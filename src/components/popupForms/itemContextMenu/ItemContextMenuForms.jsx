import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../ContextMenuPopUpStyles.module.css";

import { getCategoriesForItem } from "../../../api/Item";

import Button from "../../buttons/Button";
import AddItemToCategoriesForm from "./AddItemToCategoriesForm";
import RemoveItemFromCategoriesForm from "./RemoveItemFromCategoriesForm";

const ItemContextMenuForms = ({ itemId, imagePath, handleClose }) => {
	const dispatch = useDispatch();
	const { refresh } = useSelector((state) => state.categories);
	const [itemsCurrCategories, setItemsCurrCategories] = useState([]);

	useEffect(() => {
		getCategoriesForItem(itemId)
			.then((fetchedCategories) => {
				setItemsCurrCategories(fetchedCategories);
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
				<img
					src={imagePath}
					alt="Preview"
					id={`${itemId}-ItemCM`}
					className={styles.popupImage}
				/>
				<AddItemToCategoriesForm
					itemId={itemId}
					handleClose={handleClose}
					itemsCurrCategories={itemsCurrCategories}
				/>
				<br />
				<hr />
				<RemoveItemFromCategoriesForm
					itemId={itemId}
					handleClose={handleClose}
					itemsCurrCategories={itemsCurrCategories}
				/>
				<br />
			</div>
		</>
	);
};

export default ItemContextMenuForms;
