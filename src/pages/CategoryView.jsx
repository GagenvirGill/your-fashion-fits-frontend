import React from "react";

import ItemCardDisplay from "../components/closetPage/ItemCardDisplay";

import styles from "./CategoryView.module.css";

const CategoryView = ({ categoryId, categoryName }) => {
	return (
		<div className={styles.categoryView}>
			<br />
			<h3 className={styles.categoryTitle}>{categoryName}</h3>
			<ItemCardDisplay categoryIdFilter={categoryId} />
		</div>
	);
};

export default CategoryView;
