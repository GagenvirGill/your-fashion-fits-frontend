import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshState as refreshCategoryState } from "../store/reducers/categoriesReducer";
import { refreshState as refreshItemState } from "../store/reducers/itemsReducer";

import styles from "./Home.module.css";

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(refreshCategoryState());
		dispatch(refreshItemState());
	}, [dispatch]);

	return <div className={styles.homePage}></div>;
};

export default Home;
