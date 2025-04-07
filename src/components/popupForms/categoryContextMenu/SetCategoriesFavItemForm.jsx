import React from "react";
import styles from "./SetCategoriesFavItemForm.module.css";
import { useDispatch } from "react-redux";

import { setCategoriesFavItem } from "../../../api/Category";
import { refreshState } from "../../../store/reducers/categoriesReducer";

import Button from "../../buttons/Button";
import ItemsRadioForm from "../../forms/ItemsRadioForm";

const SetCategoriesFavItemForm = ({
	categoryId,
	handleClose,
	currFavItem,
	categoryName,
}) => {
	const dispatch = useDispatch();

	const handleSubmit = async (selectedItemId) => {
		await setCategoriesFavItem(categoryId, selectedItemId);
		dispatch(refreshState());
		handleClose();
	};

	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.popupForm}>
				<br />
				<Button onClick={handleClose} text={"Close Form"} />
				<br />
				<br />
				<p className={styles.formTitle}>
					Select {categoryName}'s' Favorite Item and Screen Saver
				</p>
				<ItemsRadioForm
					handleSubmit={handleSubmit}
					preSelectedItemId={currFavItem}
				/>
				<br />
			</div>
		</>
	);
};

export default SetCategoriesFavItemForm;
