import React from "react";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";
import FilterItemsForm from "../components/forms/FilterItemsForm";
import CategoryCardDisplay from "../components/cardDisplay/CategoryCardDisplay";

import styles from "./Closet.module.css";

const Closet = () => {
	return (
		<div className={styles.closetPage}>
			<p className={styles.closetTitle}>Categories</p>
			<CategoryCardDisplay />
			<br />
			<p className={styles.closetTitle}>Items</p>
			<FilterItemsForm />
			<ItemCardDisplay />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</div>
	);
};

export default Closet;
