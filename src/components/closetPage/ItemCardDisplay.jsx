import React, { useState, useEffect } from "react";
import { getAllItems } from "../../api/Item";
import { useItems } from "../../context/ItemContext";
import ItemCard from "./ItemCard";
import styles from "../../styles/ItemCardDisplay.module.css"

const ItemCardDisplay = ({ isSidePanelCollapsed }) => {
	const { filteredItems } = useItems();
    const [items, setItems] = useState([]);

    useEffect(() => {
        getAllItems().then((fetchedItems) => {
            setItems(fetchedItems);
        }).catch((err) => {
            console.log(`Error loading items: ${err}`)
        });
    }, []);

	useEffect(() => {
		setItems(filteredItems);
	}, [filteredItems]);

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
