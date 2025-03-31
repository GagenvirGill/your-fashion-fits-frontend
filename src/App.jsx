import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Closet from "./pages/Closet";
import CategoryView from "./pages/CategoryView";
import AllItemsView from "./pages/AllItemsView";

import Navbar from "./components/nav/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "./store/reducers/categoriesReducer";
import { getAllCategories } from "./api/Category";
import { setItems } from "./store/reducers/itemsReducer";
import { getAllItems } from "./api/Item";

const App = () => {
	const dispatch = useDispatch();
	const { categories, refresh: categoriesRefresh } = useSelector(
		(state) => state.categories
	);
	const { refresh: itemsRefresh } = useSelector((state) => state.items);

	useEffect(() => {
		const makeRequests = async () => {
			try {
				const fetchedCategories = await getAllCategories();
				const fetchedItems = await getAllItems();
				dispatch(setCategories(fetchedCategories));
				dispatch(setItems(fetchedItems));
			} catch (err) {
				console.log(`Initial Loading Error: ${err}`);
			}
		};

		makeRequests();
	}, [dispatch]);

	useEffect(() => {
		getAllCategories()
			.then((fetchedCategories) => {
				dispatch(setCategories(fetchedCategories));
			})
			.catch((err) => {
				console.log(`Error loading categories: ${err}`);
			});
	}, [categoriesRefresh]);

	useEffect(() => {
		getAllItems()
			.then((fetchedItems) => {
				dispatch(setItems(fetchedItems));
			})
			.catch((err) => {
				console.log(`Error loading items: ${err}`);
			});
	}, [itemsRefresh]);

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<Home />} />
				<Route path="/closet" element={<Closet />} />
				<Route path="/closet/all" element={<AllItemsView />} />
				{categories.map((category) => (
					<Route
						key={category.categoryId}
						path={`/closet/${category.name
							.toLowerCase()
							.replace(/\s+/g, "")}`}
						element={
							<CategoryView
								categoryId={category.categoryId}
								categoryName={category.name}
							/>
						}
					/>
				))}
			</Routes>
		</Router>
	);
};

export default App;
