import React from "react";
import styles from "../../styles/ItemCard.module.css"

const ItemCard = ({ itemId, imagePath }) => {
    return (
        <div className={styles.itemCard}>
            <img 
                src={`${'http://localhost:5001'}${imagePath}`} 
                alt="Preview" 
                id={itemId}
            />
        </div>
    );
};

export default ItemCard
