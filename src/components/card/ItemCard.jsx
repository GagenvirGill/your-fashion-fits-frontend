import React from "react";
import { deleteItem } from "../../api/Item";
import Card from "./Card";
import styles from "./ItemCard.module.css";

const ItemCard = ({ itemId, imagePath }) => {
	const onDelete = () => {
		deleteItem(itemId);
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
