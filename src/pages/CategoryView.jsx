import React from "react";
import styles from "./GenericPageStyles.module.css";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";

const CategoryView = ({ categoryId, categoryName }) => {
	return (
		<div className={styles.pageContainer}>
			<div className={styles.pageTitle}>{categoryName}</div>
			<br />
			<ItemCardDisplay selectedCategories={[categoryId]} />
		</div>
	);
};

export default CategoryView;
