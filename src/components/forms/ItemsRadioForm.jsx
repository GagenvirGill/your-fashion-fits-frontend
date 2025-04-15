import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./FormStyles.module.css";

import ImgRadioButton from "../buttons/ImgRadioButton";
import Button from "../buttons/Button";

const ItemsRadioForm = ({
	handleSubmit,
	preSelectedItemId,
	displayItems,
	formId,
	returnImagePath,
}) => {
	let display_items;
	if (displayItems) {
		display_items = displayItems;
	} else {
		const { items } = useSelector((state) => state.items);
		display_items = items;
	}

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
			{display_items.map((item) => (
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
