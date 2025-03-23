import React from "react";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";
import FilterItemsForm from "../components/forms/FilterItemsForm";

import styles from "./AllItemsView.module.css";

const AllItemsView = () => {
	return (
		<div className={styles.allItemsView}>
			<h3 className={styles.allTitle}>All Items</h3>
			<FilterItemsForm />
			<ItemCardDisplay />
		</div>
	);
};

export default AllItemsView;
