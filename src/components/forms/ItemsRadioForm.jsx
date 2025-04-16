import React, { useState, useEffect } from "react";
import styles from "./FormStyles.module.css";

import { filterItemsByCategories } from "../../api/Item";

import ImgRadioButton from "../buttons/ImgRadioButton";
import Button from "../buttons/Button";

const ItemsRadioForm = ({
	handleSubmit,
	preSelectedItemId,
	formId,
	returnImagePath,
	filteringCategoryIds,
}) => {
	const [displayItems, setDisplayItems] = useState([]);

	useEffect(() => {
		if (filteringCategoryIds) {
			filterItemsByCategories(filteringCategoryIds)
				.then((filteredItems) => {
					setDisplayItems(filteredItems);
				})
				.catch((error) => {
					console.error("Error filtering items:", error);
				});
		}
	}, [filteringCategoryIds]);

	const [selectedItemId, setSelectedItemId] = useState(preSelectedItemId);
	const [selectedItemImagePath, setSelectedItemImagePath] = useState(null);

	const handleRadioChange = (item) => {
		setSelectedItemId(item.itemId);
		if (returnImagePath) {
			setSelectedItemImagePath(item.imagePath);
		}
	};

	const handleRadioSubmit = (e) => {
		e.preventDefault();
		if (returnImagePath) {
			handleSubmit(selectedItemId, selectedItemImagePath);
		} else {
			handleSubmit(selectedItemId);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleRadioSubmit}>
			{displayItems.map((item) => (
				<ImgRadioButton
					key={`${formId}-${item.itemId}`}
					buttonId={item.itemId}
					imgPath={item.imagePath}
					isSelected={selectedItemId === item.itemId}
					onChange={() => handleRadioChange(item)}
					formId={`${formId}-uniqueID`}
				/>
			))}
			<br />
			<div className={styles.spacer}></div>
			<Button type={"submit"} text={"Submit"} />
		</form>
	);
};

export default ItemsRadioForm;
