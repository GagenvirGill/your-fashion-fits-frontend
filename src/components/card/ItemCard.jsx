import React from "react";
import { deleteItem } from "../../api/Item";
import Card from "./Card";
import styles from "./ItemCard.module.css";

import { useDispatch } from "react-redux";
import { refreshState } from "../../store/reducers/itemsReducer";

const ItemCard = ({ itemId, imagePath }) => {
	const dispatch = useDispatch();

	const onDelete = () => {
		deleteItem(itemId).then(() => {
			dispatch(refreshState());
		});
	};

	return (
		<Card id={itemId} onDelete={onDelete} className={styles.itemCard}>
			<img
				src={`${"http://localhost:5001"}${imagePath}`}
				alt="Preview"
				id={itemId}
			/>
		</Card>
	);
};

export default ItemCard;
