import React, { useState } from "react";
import styles from "./GenericPageStyles.module.css";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";
import FilterItemsForm from "../components/forms/FilterItemsForm";

const AllItemsView = () => {
	const [selectedCategories, setSelectedCategories] = useState([]);

	const handleSubmit = async (selCategories) => {
		setSelectedCategories(selCategories);
	};

	return (
		<div className={styles.pageContainer}>
			<div className={styles.pageTitle}>All of Your Items</div>
			<div className={styles.pageText}>
				Filter Your Items by their Categories
			</div>
			<FilterItemsForm handleSubmit={handleSubmit} />
			<ItemCardDisplay selectedCategories={selectedCategories} />
		</div>
	);
};

export default AllItemsView;
