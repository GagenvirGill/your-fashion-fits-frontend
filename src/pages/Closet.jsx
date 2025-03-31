import React from "react";
import styles from "./Closet.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshState as refreshCategoryState } from "../store/reducers/categoriesReducer";
import { refreshState as refreshItemState } from "../store/reducers/itemsReducer";

import CategoryCardDisplay from "../components/cardDisplay/CategoryCardDisplay";

const Closet = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(refreshCategoryState());
		dispatch(refreshItemState());
	}, [dispatch]);

	return (
		<div className={styles.closetPage}>
			<CategoryCardDisplay />
		</div>
	);
};

export default Closet;
