import React, { useState, useEffect } from "react";

import { getAllItems } from "../api/Item";

const AllItemDisplay = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getAllItems().then(setItems);
    }, []);

    return (
        <>
            {items.map(item =>  
                <img 
                src={`${item.image}`} 
                alt="Preview" 
                style={{ maxWidth: "200px" }}
                id={item.itemId}
                key={item.itemId}
                />
            )}
        </>
    );    
};

export default AllItemDisplay;