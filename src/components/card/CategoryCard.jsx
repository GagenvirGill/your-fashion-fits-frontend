import React from "react";
import Card from "./Card";
import { deleteCategory } from "../../api/category";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ categoryId, imagePath, categoryName }) => {
	const onDelete = () => {
		deleteCategory(categoryId);
	};

	return (
		<Card
			id={categoryId}
			onDelete={onDelete}
			className={styles.categoryCard}
		>
			<img
				src={`${"http://localhost:5001"}${imagePath}`}
				alt="Preview"
				id={categoryId}
			/>
			<p>{categoryName}</p>
		</Card>
	);
};

export default ItemCard;
