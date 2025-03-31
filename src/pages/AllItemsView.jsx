import React, { useState } from "react";
import styles from "./AllItemsView.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshState as refreshCategoryState } from "../store/reducers/categoriesReducer";
import { refreshState as refreshItemState } from "../store/reducers/itemsReducer";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";
import FilterItemsForm from "../components/forms/FilterItemsForm";

const AllItemsView = () => {
	const dispatch = useDispatch();
	const [selectedCategories, setSelectedCategories] = useState([]);

	useEffect(() => {
		dispatch(refreshCategoryState());
		dispatch(refreshItemState());
	}, [dispatch]);

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
