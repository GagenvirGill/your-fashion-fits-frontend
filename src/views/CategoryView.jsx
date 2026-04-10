"use client";

import React from "react";
import styles from "./GenericPageStyles.module.css";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";

const CategoryView = ({ categoryId, categoryName, items, outfits }) => {
	return (
		<div className={styles.pageContainer}>
			<div className={styles.pageTitle}>{`'${categoryName}' Items`}</div>
			<br />
			<ItemCardDisplay
				selectedCategories={[categoryId]}
				items={items}
				outfits={outfits}
			/>
		</div>
	);
};

export default CategoryView;
