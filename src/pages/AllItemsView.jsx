import React from "react";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";
import FilterItemsForm from "../components/forms/FilterItemsForm";

import styles from "./AllItemsView.module.css";

const AllItemsView = () => {
	return (
		<div className={styles.allItemsView}>
			<p className={styles.allTitle}>All Items</p>
			<FilterItemsForm />
			<ItemCardDisplay />
		</div>
	);
};

export default AllItemsView;
