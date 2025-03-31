import React from "react";
import styles from "./CategoryView.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshState as refreshCategoryState } from "../store/reducers/categoriesReducer";
import { refreshState as refreshItemState } from "../store/reducers/itemsReducer";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";

const CategoryView = ({ categoryId, categoryName }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(refreshCategoryState());
		dispatch(refreshItemState());
	}, [dispatch]);

	return (
		<div className={styles.categoryView}>
			<p className={styles.categoryTitle}>{categoryName}</p>
			<ItemCardDisplay selectedCategories={[categoryId]} />
		</div>
	);
};

export default CategoryView;
