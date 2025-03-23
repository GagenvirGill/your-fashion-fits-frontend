import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../store/reducers/itemsReducer";
import styles from "./ItemCardDisplay.module.css";

import { getAllItems } from "../../api/Item";
import { filterItemsByCategories } from "../../api/Item";

import ItemCard from "../card/ItemCard";

const ItemCardDisplay = ({ categoryIdFilter }) => {
	const dispatch = useDispatch();
	const { items, refresh } = useSelector((state) => state.items);

	useEffect(() => {
		if (categoryIdFilter) {
			filterItemsByCategories([categoryIdFilter])
				.then((fetchedItems) => {
					dispatch(setItems(fetchedItems));
				})
				.catch((err) => {
					console.log(`Error loading items: ${err}`);
				});
		} else {
			getAllItems()
				.then((fetchedItems) => {
					dispatch(setItems(fetchedItems));
				})
				.catch((err) => {
					console.log(`Error loading items: ${err}`);
				});
		}
	}, [dispatch, refresh]);

	return (
		<>
			<div className={styles.itemCardDisplay}>
				{items.map((item) => (
					<ItemCard
						key={item.itemId}
						itemId={item.itemId}
						imagePath={item.imagePath}
					/>
				))}
			</div>
		</>
	);
};

export default ItemCardDisplay;
