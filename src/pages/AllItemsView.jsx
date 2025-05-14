import React, { useState } from "react";
import styles from "./GenericPageStyles.module.css";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";
import ItemsPopupFilterForm from "../components/popupForms/itemsPage/ItemsPopupFilterForm";
import Button from "../components/buttons/Button";

const AllItemsView = () => {
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [showFilterForm, setShowFilterForm] = useState(false);

	const handleClose = () => {
		setShowFilterForm(false);
	};

	const handleOpen = () => {
		setShowFilterForm(true);
	};

	return (
		<>
			<div className={styles.pageContainer}>
				<div className={styles.pageTitle}>All of Your Items</div>
				<br />
				<Button type="submit" text="Filter" onClick={handleOpen} />
				<ItemCardDisplay selectedCategories={selectedCategories} />
			</div>
			{showFilterForm && (
				<ItemsPopupFilterForm
					handleClose={handleClose}
					setSelectedCategories={setSelectedCategories}
				/>
			)}
		</>
	);
};

export default AllItemsView;
