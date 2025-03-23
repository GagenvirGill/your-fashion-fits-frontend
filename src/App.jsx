import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Closet from "./pages/Closet";
import CategoryView from "./pages/CategoryView";

import Navbar from "./components/nav/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "./store/reducers/categoriesReducer";
import { getAllCategories } from "./api/Category";

const App = () => {
	const dispatch = useDispatch();
	const { categories, refresh } = useSelector((state) => state.categories);

	useEffect(() => {
		getAllCategories()
			.then((fetchedCategories) => {
				dispatch(setCategories(fetchedCategories));
			})
			.catch((err) => {
				console.log(`Error loading categories: ${err}`);
			});
	}, [dispatch, refresh]);

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/closet" element={<Closet />} />
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
