import React, { useState } from "react";
import { deleteItem } from "../../api/Item";
import Card from "./Card";
import AddItemToCategoriesForm from "./itemForms/AddItemToCategoriesForm";
import styles from "./ItemCard.module.css";

import { useDispatch } from "react-redux";
import { refreshState } from "../../store/reducers/itemsReducer";

const ItemCard = ({ itemId, imagePath }) => {
	const dispatch = useDispatch();
	const [showForm, setShowForm] = useState(false);

	const onDelete = () => {
		deleteItem(itemId).then(() => {
			dispatch(refreshState());
		});
	};

	const handleShowForm = () => {
		setShowForm(true);
	};

	const handleCloseForm = () => {
		setShowForm(false);
	};

	return (
		<>
			<Card
				id={itemId}
				onDelete={onDelete}
				className={styles.itemCard}
				customContextMenu={
					<button onClick={handleShowForm}>Add to Categories</button>
				}
			>
				<img
					src={`${"http://localhost:5001"}${imagePath}`}
					alt="Preview"
					id={itemId}
				/>
			</Card>
			{showForm && (
				<AddItemToCategoriesForm
					itemId={itemId}
					imagePath={imagePath}
					handleClose={handleCloseForm}
				/>
			)}
		</>
	);
};

export default ItemCard;
