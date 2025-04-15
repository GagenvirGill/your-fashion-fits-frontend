import React from "react";
import styles from "./GenericPageStyles.module.css";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";

const CategoryView = ({ categoryId, categoryName }) => {
	return (
		<div className={styles.pageContainer}>
			<p className={styles.pageTitle}>{categoryName}</p>
			<ItemCardDisplay selectedCategories={[categoryId]} />
		</div>
	);
};

export default CategoryView;
