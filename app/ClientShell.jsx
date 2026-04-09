"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";

import Navbar from "../src/components/nav/Navbar";
import Notifications from "../src/components/notifications/Notifications";

import { setCategories } from "../src/store/reducers/categoriesReducer";
import { setItems } from "../src/store/reducers/itemsReducer";
import { setOutfits } from "../src/store/reducers/outfitsReducer";
import { addNotification } from "../src/store/reducers/notificationsReducer";

import { getAllCategories } from "../src/api/actions/category";
import { getAllItems } from "../src/api/actions/item";
import { getAllOutfits } from "../src/api/actions/outfit";

export default function ClientShell({ children }) {
	const dispatch = useDispatch();
	const { data: session, status } = useSession();
	const isAuthenticated = status === "authenticated";

	const { refresh: categoriesRefresh } = useSelector(
		(state) => state.categories
	);
	const { refresh: itemsRefresh } = useSelector((state) => state.items);
	const { refresh: outfitsRefresh } = useSelector((state) => state.outfits);

	const [initialCategState, setInitialCategState] = useState(false);

	useEffect(() => {
		if (!isAuthenticated || !session?.user?.email) return;
		dispatch(addNotification(`Successfully logged in ${session.user.email}`));
	}, [isAuthenticated]);

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
		<>
			<Navbar />
			<Notifications />
			{children}
		</>
	);
}
