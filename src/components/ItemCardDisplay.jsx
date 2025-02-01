import React, { useState, useEffect } from "react";
import { getAllItems } from "../api/Item";
import ItemCard from "./ItemCard";

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
        <div className="item-card-display">  
            {items.map(item => (
                <ItemCard key={item.itemId} itemId={item.itemId} imagePath={item.imagePath} />
            ))}
        </div>
    );
};

export default AllItemDisplay;
