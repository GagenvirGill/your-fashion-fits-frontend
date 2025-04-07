import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./OutfitContextMenuForms.module.css";

import { getItemsForAnOutfit } from "../../../api/Outfit";

import Button from "../../buttons/Button";
import AddItemsToOutfitForm from "./AddItemsToOutfitForm";
import RemoveItemsFromOutfitForm from "./RemoveItemsFromOutfitForm";

const OutfitContextMenuForms = ({ outfitId, imagePath, handleClose }) => {
	const dispatch = useDispatch();
	const { refresh } = useSelector((state) => state.items);
	const [outfitsCurrItems, setOutfitsCurrItems] = useState([]);

	useEffect(() => {
		getItemsForAnOutfit([outfitId])
			.then((fetchedItems) => {
				setOutfitsCurrItems(fetchedItems);
			})
			.catch((err) => {
				console.log(`Error loading items: ${err}`);
			});
	}, [dispatch, refresh]);

	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.popupForm}>
				<br />
				<Button onClick={handleClose} text={"Close Form"} />
				<br />
				<br />
				<img
					src={imagePath}
					alt="Preview"
					id={`${outfitId}-OutfitCM`}
				/>
				<AddItemsToOutfitForm
					outfitId={outfitId}
					handleClose={handleClose}
					outfitsCurrItems={outfitsCurrItems}
				/>
				<br />
				<br />
				<RemoveItemsFromOutfitForm
					outfitId={outfitId}
					handleClose={handleClose}
					outfitsCurrItems={outfitsCurrItems}
				/>
				<br />
			</div>
		</>
	);
};

export default OutfitContextMenuForms;
