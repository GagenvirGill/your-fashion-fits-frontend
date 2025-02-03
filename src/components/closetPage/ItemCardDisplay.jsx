import React, { useState, useEffect } from "react";
import { getAllItems } from "../../api/Item";
import ItemCard from "./ItemCard";
import styles from "../../styles/ItemCardDisplay.module.css"

const AllItemDisplay = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getAllItems().then((fetchedItems) => {
            console.log(fetchedItems);
            setItems(fetchedItems);
        }).catch((err) => {
            console.log(`Error loading items: ${err}`)
        });
    }, []);

    return (
        <div className={styles.itemCardDisplay}>  
            {items.map(item => (
                <ItemCard key={item.itemId} itemId={item.itemId} imagePath={item.imagePath} />
            ))}
        </div>
    );
};

export default AllItemDisplay;
