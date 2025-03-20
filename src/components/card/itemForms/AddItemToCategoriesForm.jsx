import React from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../../store/reducers/itemsReducer";
import { addItemToCategories } from "../../../api/Item";
import CategoriesCheckboxForm from "../../forms/CategoriesCheckboxForm";
import Button from "../../buttons/Button";
import styles from "./AddItemToCategoriesForm.module.css";

const AddItemToCategoriesForm = ({ itemId, imagePath, handleClose }) => {
	const dispatch = useDispatch();

	const handleSubmit = async (selectedCategories) => {
		await addItemToCategories(itemId, selectedCategories);
		dispatch(refreshState());
		handleClose();
	};

	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.popupForm}>
				<p>Select Which Categories to Add this Item to</p>
				<img
					src={`${"http://localhost:5001"}${imagePath}`}
					alt="Preview"
					id={`${itemId}-AITCF`}
				/>
				<CategoriesCheckboxForm handleSubmit={handleSubmit} />
				<Button onClick={handleClose} text={"Close"} />
			</div>
		</>
	);
};

export default AddItemToCategoriesForm;
