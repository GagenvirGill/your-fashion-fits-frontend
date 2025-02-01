import React from "react";
import "../styles/ItemCard.css"

const ItemCard = ({ itemId, imagePath }) => {
    console.log(`${'http://localhost:5001'}${imagePath}`);
    return (
        <div className="item-card">
            <img 
                src={`${'http://localhost:5001'}${imagePath}`} 
                alt="Preview" 
                id={itemId}
            />
        </div>
    );
};

export default ItemCard
