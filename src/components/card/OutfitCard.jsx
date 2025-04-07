import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../store/reducers/outfitsReducer";

import styles from "./OutfitCard.module.css";
import { deleteOutfit } from "../../api/Outfit";

import Card from "./Card";
import OutfitContextMenuForms from "../popupForms/outfitContextMenu/OutfitContextMenuForms";
import ContextMenuButton from "../buttons/ContextMenuButton";

const OutfitCard = ({ outfitId, imagePath, dateWorn, description }) => {
	const dispatch = useDispatch();
	const [showForm, setShowForm] = useState(false);

	const onDelete = () => {
		deleteOutfit(outfitId).then(() => {
			dispatch(refreshState());
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
				id={outfitId}
				onDelete={onDelete}
				className={styles.outfitCard}
				customConMenu={
					<ContextMenuButton
						onClick={handleShowForm}
						text="Manage this Outfits's Items"
					/>
				}
				type={`'${dateWorn}' Outfit`}
			>
				<img src={imagePath} alt="Preview" id={outfitId} />
				<p className={styles.outfitCardText}>{dateWorn}</p>
				<p
					className={`${styles.outfitCardText} ${styles.outfitCardDesc}`}
				>
					{description}
				</p>
			</Card>
			{showForm && (
				<OutfitContextMenuForms
					outfitId={outfitId}
					imagePath={imagePath}
					handleClose={handleCloseForm}
				/>
			)}
		</>
	);
};

export default OutfitCard;
