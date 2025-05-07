import React from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../store/reducers/outfitsReducer";
import { addNotification } from "../../store/reducers/notificationsReducer";

import styles from "./OutfitCard.module.css";
import { deleteOutfit } from "../../api/Outfit";

import Card from "./Card";

const OutfitCard = ({ outfitId, dateWorn, desc, items, totalWeight }) => {
	const dispatch = useDispatch();

	const onDelete = () => {
		deleteOutfit(outfitId).then(() => {
			dispatch(refreshState());
			dispatch(
				addNotification(
					`Successfully Deleted Outfit Worn on ${dateWorn}!`
				)
			);
		});
	};

	const sortedRows = [...items]
		.sort((a, b) => a.orderNum - b.orderNum)
		.map((item) =>
			[...item.TemplateItems].sort((a, b) => a.orderNum - b.orderNum)
		);

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
					{sortedRows.map((row, rowIndex) => {
						return (
							<div
								key={`${outfitId}-${rowIndex}`}
								className={styles.outfitRowContainer}
							>
								{row.map((item, itemIdx) => {
									return (
										<img
											key={`${item.Item.itemId}-${item.templateItemId}`}
											src={item.Item.imagePath}
											alt="item-img"
											style={{
												maxHeight: `${Math.min(
													(item.itemWeight /
														totalWeight) *
														640,
													300
												)}px`,
												marginLeft:
													itemIdx > 0
														? `-${
																20 +
																row.length * 5
														  }%`
														: "0%",
											}}
										/>
									);
								})}
							</div>
						);
					})}
				</div>
				<p className={styles.outfitDate}>{dateWorn}</p>
				<p className={styles.outfitDesc}>{desc}</p>
			</Card>
		</>
	);
};

export default OutfitCard;

// zIndex: `${
// 	row.length * -1 + itemIdx + 100
// }`,
