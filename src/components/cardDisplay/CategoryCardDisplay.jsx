import React from "react";
import { useSelector } from "react-redux";
import styles from "./CategoryCardDisplay.module.css";

import CategoryCard from "../card/CategoryCard";
import { Link } from "react-router-dom";

const CategoryCardDisplay = () => {
	const { categories } = useSelector((state) => state.categories);

	return (
		<div className={styles.categoryCardDisplay}>
			<Link key={`all.link`} to={`/closet/all`}>
				<CategoryCard
					key={`all.card`}
					categoryId={0}
					categoryName={"All"}
					imagePath={"/uploads/image-1742079245241-160798446.png"}
				/>
			</Link>
			{categories.map((category) => (
				<Link
					key={`${category.categoryId}.link`}
					to={`/closet/${category.name
						.toLowerCase()
						.replace(/\s+/g, "")}`}
				>
					<CategoryCard
						key={`${category.categoryId}.card`}
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
