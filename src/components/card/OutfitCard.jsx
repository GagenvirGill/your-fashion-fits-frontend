import React from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../store/reducers/outfitsReducer";

import styles from "./OutfitCard.module.css";
import { deleteOutfit } from "../../api/Outfit";

import Card from "./Card";

const OutfitCard = ({ outfitId, dateWorn, description, items }) => {
	const dispatch = useDispatch();

	const onDelete = () => {
		deleteOutfit(outfitId).then(() => {
			dispatch(refreshState());
		});
	};

	const sortedItems = [...items].sort((a, b) => a.orderNum - b.orderNum);

	return (
		<>
			<Card
				id={outfitId}
				onDelete={onDelete}
				className={styles.outfitCard}
				type={`'${dateWorn}' Outfit`}
			>
				<div>
					{sortedItems.map((item) => (
						<img
							key={`${item.templateItemId}-${item.Item.itemId}`}
							src={item.Item.imagePath}
							alt={"item-img"}
						/>
					))}
				</div>
				<img src={imagePath} alt="Preview" id={outfitId} />
				<p className={styles.outfitDate}>{dateWorn}</p>
				<p className={styles.outfitDesc}>{description}</p>
			</Card>
		</>
	);
};

export default OutfitCard;
