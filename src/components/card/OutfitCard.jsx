import React from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../store/reducers/outfitsReducer";

import styles from "./OutfitCard.module.css";
import { deleteOutfit } from "../../api/Outfit";

import Card from "./Card";

const OutfitCard = ({ outfitId, dateWorn, desc, items, totalWeight }) => {
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
				<div className={styles.outfitImage}>
					{sortedItems.map((item) => (
						<img
							key={`${item.Item.itemId}-${item.Item.templateItemId}`}
							src={`http://localhost:5001${item.Item.imagePath}`}
							alt="item-img"
							style={{
								maxHeight: `${
									(item.itemWeight / totalWeight) * 100
								}%`,
								maxWidth: "100%",
								objectFit: "contain",
							}}
						/>
					))}
				</div>
				<p className={styles.outfitDate}>{dateWorn}</p>
				<p className={styles.outfitDesc}>{desc}</p>
			</Card>
		</>
	);
};

export default OutfitCard;
