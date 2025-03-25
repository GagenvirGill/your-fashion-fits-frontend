import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../store/reducers/itemsReducer";
import styles from "./ItemCardDisplay.module.css";

import { getAllItems } from "../../api/Item";
import { filterItemsByCategories } from "../../api/Item";

import ItemCard from "../card/ItemCard";

const ItemCardDisplay = ({ selectedCategories }) => {
	const dispatch = useDispatch();
	const { refresh } = useSelector((state) => state.items);
	const [displayItems, setDisplayItems] = useState([]);

	useEffect(() => {
		if (selectedCategories) {
			filterItemsByCategories(selectedCategories)
				.then((fetchedItems) => {
					setDisplayItems(fetchedItems);
				})
				.catch((err) => {
					console.log(`Error loading items: ${err}`);
				});
		} else {
			getAllItems()
				.then((fetchedItems) => {
					setDisplayItems(fetchedItems);
					dispatch(setItems(fetchedItems));
				})
				.catch((err) => {
					console.log(`Error loading items: ${err}`);
				});
		}
	}, [dispatch, refresh, selectedCategories]);

	return (
		<>
			<div className={styles.itemCardDisplay}>
				{displayItems.map((item) => (
					<ItemCard
						key={`${item.itemId}-${selectedCategories}`}
						itemId={item.itemId}
						imagePath={item.imagePath}
					/>
				))}
			</div>
		</>
	);
};

export default ItemCardDisplay;
