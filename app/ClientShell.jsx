"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../src/components/nav/Navbar";
import Notifications from "../src/components/notifications/Notifications";

import { setCategories } from "../src/store/reducers/categoriesReducer";
import { setItems } from "../src/store/reducers/itemsReducer";
import { setOutfits } from "../src/store/reducers/outfitsReducer";
import { addNotification } from "../src/store/reducers/notificationsReducer";

import { getAllCategories } from "../src/api/Category";
import { getAllItems } from "../src/api/Item";
import { getAllOutfits } from "../src/api/Outfit";

import AuthContext from "./AuthContext";

export default function ClientShell({ children }) {
	const dispatch = useDispatch();
	const { categories, refresh: categoriesRefresh } = useSelector(
		(state) => state.categories
	);
	const { refresh: itemsRefresh } = useSelector((state) => state.items);
	const { refresh: outfitsRefresh } = useSelector((state) => state.outfits);

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [initialCategState, setInitialCategState] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const payload = JSON.parse(atob(token.split(".")[1]));
				const currentTime = Date.now() / 1000;
				if (payload.exp && payload.exp > currentTime) {
					setIsAuthenticated(true);
					dispatch(
						addNotification(
							`Successfully logged in ${payload.email}`
						)
					);
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
		if (!isAuthenticated) {
			dispatch(setCategories([]));
			return;
		}

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
		if (!isAuthenticated) {
			dispatch(setItems([]));
			return;
		}

		getAllItems()
			.then((fetchedItems) => {
				dispatch(setItems(fetchedItems));
			})
			.catch((err) => {
				console.log(`Error loading items: ${err}`);
			});
	}, [isAuthenticated, itemsRefresh]);

	useEffect(() => {
		if (!isAuthenticated) {
			dispatch(setOutfits([]));
			return;
		}

		getAllOutfits()
			.then((fetchedOutfits) => {
				dispatch(setOutfits(fetchedOutfits));
			})
			.catch((err) => {
				console.log(`Error loading outfits: ${err}`);
			});
	}, [isAuthenticated, outfitsRefresh]);

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, setIsAuthenticated, initialCategState }}
		>
			<Navbar setIsAuthenticated={setIsAuthenticated} />
			<Notifications />
			{children}
		</AuthContext.Provider>
	);
}
