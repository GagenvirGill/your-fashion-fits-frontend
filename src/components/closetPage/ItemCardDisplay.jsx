import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../store/reducers/itemsReducer"

import { getAllItems } from "../../api/Item"

import ItemCard from "./ItemCard";
import styles from "../../styles/ItemCardDisplay.module.css"

const ItemCardDisplay = ({ isSidePanelCollapsed }) => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.items);

    useEffect(() => {
        getAllItems().then((fetchedItems) => {
            dispatch(setItems(fetchedItems));
        }).catch((err) => {
            console.log(`Error loading items: ${err}`)
        });
    }, [dispatch]);

	let itemCardDisplayStyle;
	if (isSidePanelCollapsed) {
		itemCardDisplayStyle = styles.itemCardDisplay
	} else {
		itemCardDisplayStyle = styles.itemCardDisplayCollapsed
	}

    return (
        <div className={itemCardDisplayStyle}>  
            {items.map(item => (
                <ItemCard key={item.itemId} itemId={item.itemId} imagePath={item.imagePath} />
            ))}
        </div>
    );
};

export default ItemCardDisplay;
