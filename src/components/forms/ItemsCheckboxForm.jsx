import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ImgCheckboxButton from "../buttons/ImgCheckboxButton";
import Button from "../buttons/Button";
import styles from "./FormStyles.module.css";
import { filterItemsByCategories } from "../../api/Item";

const ItemsCheckboxForm = ({
	handleSubmit,
	displayItems,
	filteringCategoryIds,
}) => {
	const { items } = useSelector((state) => state.items);
	const [selectedItems, setSelectedItems] = useState([]);
	const [display_items, setDisplayItems] = useState(items);

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
		}
	}, [displayItems]);

	useEffect(() => {
		if (filteringCategoryIds) {
			if (filteringCategoryIds) {
				filterItemsByCategories(filteringCategoryIds)
					.then((filteredItems) => {
						setDisplayItems(filteredItems);
					})
					.catch((error) => {
						console.error("Error filtering items:", error);
					});
			}
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
