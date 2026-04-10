"use client";

import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { itemsAtom } from "@/jotai/itemsAtom";

import ImgCheckboxButton from "../buttons/ImgCheckboxButton";
import Button from "../buttons/Button";
import styles from "./FormStyles.module.css";
import { filterItemsByCategories } from "@/api/actions/item";

const ItemsCheckboxForm = ({
	handleSubmit,
	displayItems,
	filteringCategoryIds,
}) => {
	const allItems = useAtomValue(itemsAtom);
	const [selectedItems, setSelectedItems] = useState([]);
	const [display_items, setDisplayItems] = useState(displayItems || allItems);

	const handleCheckboxChange = (itemId, checked) => {
		setSelectedItems((prevState) => {
			if (checked) {
				return [...prevState, itemId];
			} else {
				return prevState.filter((idVal) => idVal !== itemId);
			}
		});
	};

	const handleCheckboxSubmit = async (event) => {
		event.preventDefault();
		handleSubmit(selectedItems);
	};

	useEffect(() => {
		if (displayItems) {
			setDisplayItems(displayItems);
		} else if (!filteringCategoryIds) {
			setDisplayItems(allItems);
		}
	}, [displayItems, allItems]);

	useEffect(() => {
		if (filteringCategoryIds) {
			setDisplayItems([]);
			filterItemsByCategories(filteringCategoryIds)
				.then((filteredItems) => {
					setDisplayItems(filteredItems);
				})
				.catch((error) => {
					console.error("Error filtering items:", error);
				});
		}
	}, [filteringCategoryIds]);

	return (
		<form className={styles.form} onSubmit={handleCheckboxSubmit}>
			{display_items.map((item) => (
				<ImgCheckboxButton
					key={item.itemId}
					buttonId={item.itemId}
					imgPath={item.imagePath}
					onChange={(e) => {
						handleCheckboxChange(item.itemId, e.target.checked);
					}}
				/>
			))}
			<br />
			<div className={styles.spacer}></div>
			<Button type={"submit"} text={"Submit"} />
		</form>
	);
};

export default ItemsCheckboxForm;
