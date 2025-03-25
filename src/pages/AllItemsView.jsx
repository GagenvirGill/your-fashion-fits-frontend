import React, { useState } from "react";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";
import FilterItemsForm from "../components/forms/FilterItemsForm";

import styles from "./AllItemsView.module.css";

const AllItemsView = () => {
	const [selectedCategories, setSelectedCategories] = useState([]);

	const handleSubmit = async (selCategories) => {
		setSelectedCategories(selCategories);
	};

	return (
		<div className={styles.allItemsView}>
			<p className={styles.allTitle}>All Items</p>
			<FilterItemsForm handleSubmit={handleSubmit} />
			<ItemCardDisplay selectedCategories={selectedCategories} />
		</div>
	);
};

export default AllItemsView;
