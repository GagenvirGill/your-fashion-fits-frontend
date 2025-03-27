import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./ItemsRadioForm.module.css";

import ImgRadioButton from "../buttons/ImgRadioButton";
import Button from "../buttons/Button";

const ItemsRadioForm = ({ handleSubmit, preSelectedItemId, displayItems }) => {
	let display_items;
	if (displayItems) {
		display_items = displayItems;
	} else {
		const { items } = useSelector((state) => state.items);
		display_items = items;
	}

	const [selectedItemId, setSelectedItemId] = useState(preSelectedItemId);

	const handleRadioChange = (itemId) => {
		setSelectedItemId(itemId);
	};

	const handleRadioSubmit = async () => {
		handleSubmit(selectedItemId);
	};

	return (
		<form className={styles.form} onSubmit={handleRadioSubmit}>
			{display_items.map((item) => (
				<ImgRadioButton
					key={item.itemId}
					buttonId={item.itemId}
					imgPath={item.imagePath}
					isSelected={selectedItemId === item.itemId}
					onChange={() => handleRadioChange(item.itemId)}
					formId={"setCategoriesFavItem-uniqueID"}
				/>
			))}
			<br />
			<Button type={"submit"} text={"Submit"} />
		</form>
	);
};

export default ItemsRadioForm;
