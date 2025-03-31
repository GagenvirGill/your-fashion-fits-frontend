import React from "react";
import { useSelector } from "react-redux";
import styles from "./CategoryCardDisplay.module.css";

import CategoryCard from "../card/CategoryCard";

const CategoryCardDisplay = () => {
	const { categories } = useSelector((state) => state.categories);
	const { items: currItems } = useSelector((state) => state.items);

	return (
		<div className={styles.categoryCardDisplay}>
			<CategoryCard
				key={`all.card`}
				categoryId={null}
				categoryName={"All"}
				urlRoute={`/closet/all`}
				imagePath={"/search_browse_icon.png"}
			/>
			{categories.map((category) => {
				const item = currItems.find(
					(item) => item.itemId === category.favoriteItem
				);

				return (
					<CategoryCard
						key={`${category.categoryId}.card`}
						categoryId={category.categoryId}
						categoryName={category.name}
						urlRoute={`/closet/${category.name
							.toLowerCase()
							.replace(/\s+/g, "")}`}
						imagePath={
							item
								? `${"http://localhost:5001"}${item.imagePath}`
								: "/default_icon.png"
						}
						{...(item && { favItemId: item.itemId })}
					/>
				);
			})}
		</div>
	);
};

export default CategoryCardDisplay;
