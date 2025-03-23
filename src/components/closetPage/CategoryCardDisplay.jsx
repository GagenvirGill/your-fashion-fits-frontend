import React from "react";
import { useSelector } from "react-redux";
import styles from "./CategoryCardDisplay.module.css";

import CategoryCard from "../card/CategoryCard";
import { Link } from "react-router-dom";

const CategoryCardDisplay = () => {
	const { categories } = useSelector((state) => state.categories);

	return (
		<div className={styles.categoryCardDisplay}>
			{categories.map((category) => (
				<Link
					to={`/closet/${encodeURIComponent(
						category.name.toLowerCase()
					)}`}
				>
					<CategoryCard
						key={`${category.categoryId}.link`}
						categoryId={category.categoryId}
						categoryName={category.name}
						imagePath={"/uploads/image-1742079245241-160798446.png"}
					/>
				</Link>
			))}
		</div>
	);
};

export default CategoryCardDisplay;
