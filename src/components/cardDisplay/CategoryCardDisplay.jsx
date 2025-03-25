import React from "react";
import { useSelector } from "react-redux";
import styles from "./CategoryCardDisplay.module.css";

import CategoryCard from "../card/CategoryCard";
import { Link } from "react-router-dom";

const CategoryCardDisplay = () => {
	const { categories } = useSelector((state) => state.categories);

	return (
		<div className={styles.categoryCardDisplay}>
			<CategoryCard
				key={`all.card`}
				categoryId={null}
				categoryName={"All"}
				imagePath={"/uploads/image-1742793403720-792415603.png"}
				urlRoute={`/closet/all`}
			/>
			{categories.map((category) => (
				<CategoryCard
					key={`${category.categoryId}.card`}
					categoryId={category.categoryId}
					categoryName={category.name}
					imagePath={"/uploads/image-1742793403720-792415603.png"}
					urlRoute={`/closet/${category.name
						.toLowerCase()
						.replace(/\s+/g, "")}`}
				/>
			))}
		</div>
	);
};

export default CategoryCardDisplay;
