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

	const sortedRows = [...items]
		.sort((a, b) => a.orderNum - b.orderNum)
		.map((item) =>
			[...item.TemplateItems].sort((a, b) => a.orderNum - b.orderNum)
		);
	const rowWeights = sortedRows.map((row) =>
		row.reduce((sum, item) => sum + item.itemWeight, 0)
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
					{sortedRows.map((row, rowIndex) => (
						<div
							key={`${outfitId}-${rowIndex}`}
							className={styles.outfitRowContainer}
						>
							{row.map((item, itemIndex) => {
								const itemWidth =
									(item.itemWeight / rowWeights[rowIndex]) *
									(row.length === 1 ? 280 : 280 * 1.75);

								const availableWidth = 300;
								const totalWidth = row.reduce((sum, i) => {
									return (
										sum +
										(i.itemWeight / rowWeights[rowIndex]) *
											(row.length === 1
												? 280
												: 280 * 1.75)
									);
								}, 0);

								const overlapNeeded =
									totalWidth > availableWidth
										? ((totalWidth - availableWidth) /
												(row.length - 1)) *
										  -1
										: 0;

								return (
									<img
										key={`${item.Item.itemId}-${item.templateItemId}`}
										src={item.Item.imagePath}
										alt="item-img"
										style={{
											maxHeight: `${
												(item.itemWeight /
													totalWeight) *
												640
											}px`,
											maxWidth: `${itemWidth}px`,
											objectFit: "contain",
											marginLeft:
												itemIndex === 0
													? 0
													: `${overlapNeeded}px`,
										}}
									/>
								);
							})}
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
