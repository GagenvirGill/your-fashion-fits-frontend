import React from "react";
import styles from "./ItemContextMenuForms.module.css";
import Button from "../../buttons/Button";
import AddItemToCategoriesForm from "./AddItemToCategoriesForm";

const ItemContextMenuForms = ({ itemId, imagePath, handleClose }) => {
	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.popupForm}>
				<img
					src={`${"http://localhost:5001"}${imagePath}`}
					alt="Preview"
					id={`${itemId}-ItemCM`}
				/>
				<AddItemToCategoriesForm
					itemId={itemId}
					handleClose={handleClose}
				/>
				<Button onClick={handleClose} text={"Close Form"} />
			</div>
		</>
	);
};

export default ItemContextMenuForms;
