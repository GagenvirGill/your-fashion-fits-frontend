import React from "react";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";

import styles from "./CategoryView.module.css";

const CategoryView = ({ categoryId, categoryName }) => {
	return (
		<div className={styles.categoryView}>
			<p className={styles.categoryTitle}>{categoryName}</p>
			<ItemCardDisplay categoryIdFilter={categoryId} />
		</div>
	);
};

export default CategoryView;
