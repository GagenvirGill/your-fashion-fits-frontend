import React from "react";
import Card from "./Card";
import styles from "../../styles/CategoryCard.module.css";

const CategoryCard = ({ categoryId, imagePath, categoryName }) => {
	const onDelete = () => {
		console.log(`Delete category with ID: ${categoryId}`);
	};

	return (
		<Card id={categoryId} onDelete={onDelete} className={styles.categoryCard}>
			<img 
				src={`${'http://localhost:5001'}${imagePath}`} 
                alt="Preview" 
                id={categoryId}
			/>
			<p>{categoryName}</p>
		</Card>
	)
}

export default ItemCard;