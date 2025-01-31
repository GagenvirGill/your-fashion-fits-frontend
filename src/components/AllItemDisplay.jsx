import React, { useState, useEffect } from "react";
import { getAllItems } from "../api/Item";

const AllItemDisplay = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllItems()
            .then(fetchedItems => {
                setItems(fetchedItems);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to fetch items");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    console.log(items[0].imagePath);

    return (
        <>
            {items.map(item => 
                item.imagePath ? (
                    <img 
                        src={`${'http://localhost:5001'}${item.imagePath}`} 
                        alt="Preview" 
                        style={{ maxWidth: "200px" }}
                        id={item.itemId}
                        key={item.itemId}
                    />
                ) : (
                    <p key={item.itemId}>No image available</p> // fallback message
                )
            )}
        </>
    );
};

export default AllItemDisplay;
