import React from "react";
import Card from "./Card";
import styles from "./ItemCard.module.css";

const ItemCard = ({ itemId, imagePath }) => {
	const onDelete = () => {
		console.log(`Delete item with ID: ${itemId}`);
	};

	return (
		<Card id={itemId} onDelete={onDelete} className={styles.itemCard}>
			<img 
				src={`${'http://localhost:5001'}${imagePath}`} 
                alt="Preview" 
                id={itemId}
			/>
		</Card>
	)
}

export default ItemCard;