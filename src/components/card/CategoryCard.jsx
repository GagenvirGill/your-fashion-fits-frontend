import React from "react";
import Card from "./Card";
import { deleteCategory } from "../../api/Category";
import styles from "./CategoryCard.module.css";

import { useDispatch } from "react-redux";
import { refreshState } from "../../store/reducers/categoriesReducer";

const CategoryCard = ({ categoryId, imagePath, categoryName }) => {
	const dispatch = useDispatch();

	const onDelete = () => {
		deleteCategory(categoryId).then(() => {
			dispatch(refreshState());
		});
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
			<p className={styles.categoryCardText}>{categoryName}</p>
		</Card>
	);
};

export default CategoryCard;
