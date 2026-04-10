"use client";

import React, { useEffect, useState } from "react";
import styles from "../ContextMenuPopUpStyles.module.css";

import { getCategoriesForItem } from "@/api/actions/item";

import Button from "@/components/buttons/Button";
import AddItemToCategoriesForm from "./AddItemToCategoriesForm";
import RemoveItemFromCategoriesForm from "./RemoveItemFromCategoriesForm";

const ItemContextMenuForms = ({ itemId, imagePath, handleClose }) => {
	const [itemsCurrCategories, setItemsCurrCategories] = useState([]);

	useEffect(() => {
		getCategoriesForItem(itemId)
			.then((fetchedCategories) => {
				setItemsCurrCategories(fetchedCategories);
			})
			.catch((err) => {
				console.log(`Error loading items: ${err}`);
			});
	}, [itemId]);

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
