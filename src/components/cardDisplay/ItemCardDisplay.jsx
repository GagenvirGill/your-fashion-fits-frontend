import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ItemCardDisplay.module.css";

import { filterItemsByCategories } from "../../api/Item";

import ItemCard from "../card/ItemCard";

const ItemCardDisplay = ({ selectedCategories }) => {
	const dispatch = useDispatch();
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
			const { items } = useSelector((state) => state.items);
			setDisplayItems(items);
		}
	}, [dispatch, selectedCategories]);

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
