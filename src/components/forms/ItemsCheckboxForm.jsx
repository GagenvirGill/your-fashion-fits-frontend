import React, { useState } from "react";
import { useSelector } from "react-redux";
import ImgCheckboxButton from "../buttons/ImgCheckboxButton";
import Button from "../buttons/Button";
import styles from "./ItemsCheckboxForm.module.css";

const ItemsCheckboxForm = ({ handleSubmit, displayItems }) => {
	let display_items;
	if (displayItems) {
		display_items = displayItems;
	} else {
		const { items } = useSelector((state) => state.items);
		display_items = items;
	}

	const [selectedItems, setSelectedItems] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleCheckboxChange = (itemId, checked) => {
		setSelectedItems((prevState) => {
			if (checked) {
				return [...prevState, itemId];
			} else {
				return prevState.filter((idVal) => idVal !== itemId);
			}
		});
	};

	const handleCheckboxSubmit = async (e) => {
		setLoading(true);
		handleSubmit(selectedItems);
		setLoading(false);
	};

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
			<Button type={"submit"} text={"Submit"} disabled={loading} />
		</form>
	);
};

export default ItemsCheckboxForm;
