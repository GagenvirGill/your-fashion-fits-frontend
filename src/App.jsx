import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import Closet from "./pages/Closet";
import CategoryView from "./pages/CategoryView";
import AllItemsView from "./pages/AllItemsView";
import Navbar from "./components/nav/Navbar";

import { setCategories } from "./store/reducers/categoriesReducer";
import { setItems } from "./store/reducers/itemsReducer";
import { setOutfits } from "./store/reducers/outfitsReducer";

import { getAllCategories } from "./api/Category";
import { getAllItems } from "./api/Item";
import { getAllOutfits } from "./api/Outfit";

const App = () => {
	const dispatch = useDispatch();
	const { categories, refresh: categoriesRefresh } = useSelector(
		(state) => state.categories
	);
	const { refresh: itemsRefresh } = useSelector((state) => state.items);
	const { refresh: outfitsRefresh } = useSelector((state) => state.outfits);

	const [initialCategState, setInitialCategState] = useState(false);
	const [initialItemsState, setInitialItemsState] = useState(false);
	const [initialOutfitsState, setInitialOutfitsState] = useState(false);

	useEffect(() => {
		getAllCategories()
			.then((fetchedCategories) => {
				dispatch(setCategories(fetchedCategories));
				setInitialCategState(true);
			})
			.catch((err) => {
				console.log(`Error loading categories: ${err}`);
			});
	}, [categoriesRefresh]);

	useEffect(() => {
		getAllItems()
			.then((fetchedItems) => {
				dispatch(setItems(fetchedItems));
				setInitialItemsState(true);
			})
			.catch((err) => {
				console.log(`Error loading items: ${err}`);
			});
	}, [itemsRefresh]);

	useEffect(() => {
		getAllOutfits()
			.then((fetchedOutfits) => {
				dispatch(setOutfits(fetchedOutfits));
				setInitialOutfitsState(true);
			})
			.catch((err) => {
				console.log(`Error loading outfits: ${err}`);
			});
	}, [outfitsRefresh]);

	return (
		<Router>
			{initialItemsState && initialCategState && initialOutfitsState && (
				<>
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
				</>
			)}
		</Router>
	);
};

export default App;
