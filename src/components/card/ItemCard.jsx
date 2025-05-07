import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { refreshState as refreshItemsState } from "../../store/reducers/itemsReducer";
import { refreshState as refreshOutfitsState } from "../../store/reducers/outfitsReducer";
import { addNotification } from "../../store/reducers/notificationsReducer";

import styles from "./ItemCard.module.css";
import { deleteItem } from "../../api/Item";

import Card from "./Card";
import ItemContextMenuForms from "../popupForms/itemContextMenu/ItemContextMenuForms";
import ContextMenuButton from "../buttons/ContextMenuButton";

const ItemCard = ({ itemId, imagePath }) => {
	const dispatch = useDispatch();
	const [showForm, setShowForm] = useState(false);

	const onDelete = () => {
		deleteItem(itemId)
			.then(() => {
				dispatch(refreshItemsState());
				dispatch(refreshOutfitsState());
				dispatch(addNotification("Item Successfully Deleted!"));
			})
			.catch((error) => {
				dispatch(
					addNotification(
						"Unfortunately an Error Occured While Deleting Your Item"
					)
				);
				console.error(error);
			});
	};

	const handleShowForm = () => {
		setShowForm(true);
	};

	const handleCloseForm = () => {
		setShowForm(false);
	};

	return (
		<>
			<Card
				id={itemId}
				onDelete={onDelete}
				className={styles.itemCard}
				customConMenu={
					<ContextMenuButton
						onClick={handleShowForm}
						text="Manage Item's Categories"
					/>
				}
				type="Item"
			>
				<img src={imagePath} alt="Preview" id={itemId} />
			</Card>
			{showForm && (
				<ItemContextMenuForms
					itemId={itemId}
					imagePath={imagePath}
					handleClose={handleCloseForm}
				/>
			)}
		</>
	);
};

export default ItemCard;
