import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Closet from "./pages/Closet";
import CategoryView from "./pages/CategoryView";
import AllItemsView from "./pages/AllItemsView";
import OutfitsView from "./pages/OutfitsView";
import Navbar from "./components/nav/Navbar";
import Welcome from "./pages/Welcome";
import CreateView from "./pages/CreateView";

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

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [initialCategState, setInitialCategState] = useState(false);
	const [initialItemsState, setInitialItemsState] = useState(false);
	const [initialOutfitsState, setInitialOutfitsState] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const payload = JSON.parse(atob(token.split(".")[1]));
				const currentTime = Date.now() / 1000;
				if (payload.exp && payload.exp > currentTime) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
					localStorage.removeItem("token");
				}
			} catch (error) {
				setIsAuthenticated(false);
				localStorage.removeItem("token");
			}
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	useEffect(() => {
		if (!isAuthenticated) return;

		getAllCategories()
			.then((fetchedCategories) => {
				dispatch(setCategories(fetchedCategories));
				setInitialCategState(true);
			})
			.catch((err) => {
				console.log(`Error loading categories: ${err}`);
			});
	}, [isAuthenticated, categoriesRefresh]);

	useEffect(() => {
		if (!isAuthenticated) return;

		getAllItems()
			.then((fetchedItems) => {
				dispatch(setItems(fetchedItems));
				setInitialItemsState(true);
			})
			.catch((err) => {
				console.log(`Error loading items: ${err}`);
			});
	}, [isAuthenticated, itemsRefresh]);

	useEffect(() => {
		if (!isAuthenticated) return;

		getAllOutfits()
			.then((fetchedOutfits) => {
				dispatch(setOutfits(fetchedOutfits));
				setInitialOutfitsState(true);
			})
			.catch((err) => {
				console.log(`Error loading outfits: ${err}`);
			});
	}, [isAuthenticated, outfitsRefresh]);

	return (
		<Router>
			<>
				<Navbar setIsAuthenticated={setIsAuthenticated} />
				<Routes>
					<Route path="/" element={<Welcome />} />
					<Route path="/home" element={<Welcome />} />
					<Route path="/outfits" element={<OutfitsView />} />
					<Route path="/closet" element={<Closet />} />
					<Route path="/create" element={<CreateView />} />
					{isAuthenticated &&
					initialItemsState &&
					initialCategState &&
					initialOutfitsState ? (
						<>
							<Route
								path="/closet/all"
								element={<AllItemsView />}
							/>
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
						</>
					) : (
						<></>
					)}
					<Route path="*" element={<Welcome />} />
				</Routes>
			</>
		</Router>
	);
};

export default App;
