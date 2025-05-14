import React from "react";
import { useSelector } from "react-redux";
import styles from "./CardDisplayStyles.module.css";
import { Link } from "react-router-dom";

import CategoryCard from "../card/CategoryCard";
import BigButton from "../buttons/BigButton";

const CategoryCardDisplay = () => {
	const { categories } = useSelector((state) => state.categories);
	const { items: currItems } = useSelector((state) => state.items);

	return (
		<div className={styles.cardDisplay}>
			<Link to="/closet/all">
				<BigButton
					type="button"
					text="View All of Your Items"
					onClick={null}
				/>
			</Link>
			<br />
			<br />
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
							item ? `${item.imagePath}` : "/default_icon.png"
						}
						{...(item && { favItemId: item.itemId })}
					/>
				);
			})}
		</div>
	);
};

export default CategoryCardDisplay;
