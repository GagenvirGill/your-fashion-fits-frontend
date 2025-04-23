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

	const sortedRows = [...items].map((item) => item.TemplateItems);

	return (
		<>
			<Card
				id={outfitId}
				onDelete={onDelete}
				className={styles.outfitCard}
				customConMenu={null}
				type={`'${dateWorn}' Outfit`}
			>
				<div className={styles.outfitContainer}>
					{sortedRows.map((row, rowIndex) => (
						<div
							key={`${outfitId}-${rowIndex}`}
							className={styles.outfitRowContainer}
						>
							{row.map((item) => (
								<img
									key={`${item.Item.itemId}-${item.Item.templateItemId}`}
									src={`http://localhost:5001${item.Item.imagePath}`}
									alt="item-img"
									style={{
										maxHeight: `${
											(item.itemWeight / totalWeight) *
											650
										}px`,
										maxWidth: `${(1 / row.length) * 300}px`,
										objectFit: "contain",
									}}
								/>
							))}
						</div>
					))}
				</div>
				<p className={styles.outfitDate}>{dateWorn}</p>
				<p className={styles.outfitDesc}>{desc}</p>
			</Card>
		</>
	);
};

export default OutfitCard;
