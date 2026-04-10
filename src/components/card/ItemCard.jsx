"use client";

import React, { useState } from "react";
import { useSetAtom } from "jotai";
import { addNotificationAtom } from "@/jotai/notificationsAtom";
import styles from "./ItemCard.module.css";
import { deleteItem } from "@/api/actions/item";
import { refetchItemsAtom } from "@/jotai/itemsAtom";
import { refetchOutfitsAtom } from "@/jotai/outfitsAtom";

import Card from "./Card";
import ItemContextMenuForms from "../popupForms/itemContextMenu/ItemContextMenuForms";
import ContextMenuButton from "../buttons/ContextMenuButton";

const ItemCard = ({ itemId, imagePath }) => {
	const addNotification = useSetAtom(addNotificationAtom);
	const refetchItems = useSetAtom(refetchItemsAtom);
	const refetchOutfits = useSetAtom(refetchOutfitsAtom);
	const [showForm, setShowForm] = useState(false);

	const onDelete = async () => {
		const success = await deleteItem(itemId);
		await refetchItems();
		await refetchOutfits();

		if (success) {
			addNotification("Item Successfully Deleted!");
		} else {
			addNotification(
				"An Error Occured while trying to Delete an Item!"
			);
		}
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
