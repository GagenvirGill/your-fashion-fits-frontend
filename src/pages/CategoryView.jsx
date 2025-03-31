import React from "react";
import styles from "./CategoryView.module.css";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";

const CategoryView = ({ categoryId, categoryName }) => {
	return (
		<div className={styles.categoryView}>
			<p className={styles.categoryTitle}>{categoryName}</p>
			<ItemCardDisplay selectedCategories={[categoryId]} />
		</div>
	);
};

export default CategoryView;
