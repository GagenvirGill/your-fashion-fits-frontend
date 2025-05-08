import React from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../store/reducers/outfitsReducer";
import { addNotification } from "../../store/reducers/notificationsReducer";

import styles from "./OutfitCard.module.css";
import { deleteOutfit } from "../../api/Outfit";

import Card from "./Card";

const OutfitCard = ({ outfitId, dateWorn, desc, items, totalWeight }) => {
	const MAX_CARD_WIDTH = 350;
	const MAX_CARD_HEIGHT = 600;
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

	// const rowWeightSum = row.reduce(
	// 	(sum, item) => sum + item.itemWeight,
	// 	0
	// );

	const rowWidths = [];
	const rowMaxWidths = [];

	const rowSizes = sortedRows.map((row) => {
		const rowMaxWeight = Math.max(...row.map((item) => item.itemWeight));
		const rowHeight = (rowMaxWeight / totalWeight) * MAX_CARD_HEIGHT;

		const imageRects = row.map((item) => {
			const baseHeight = rowHeight * (item.itemWeight / rowMaxWeight);
			const baseWidth =
				baseHeight * (item.Item.imageWidth / item.Item.imageHeight);
			return {
				width: baseWidth,
				height: baseHeight,
			};
		});

		const rowWidth = imageRects
			.map((dim) => dim.width)
			.reduce((sum, val) => sum + val, 0);
		rowWidths.push(rowWidth);

		let maxRowWidth = MAX_CARD_WIDTH;
		if (row.length > 1) {
			maxRowWidth = (2 * row.length * MAX_CARD_WIDTH) / (row.length + 1);
		}
		rowMaxWidths.push(maxRowWidth);

		return imageRects;
	});

	const minScaleVals = rowWidths.map(
		(width, rowIdx) => rowMaxWidths[rowIdx] / width
	);
	const globalWidthScaler = Math.min(1, ...minScaleVals);

	const finalSizes = rowSizes.map((row) =>
		row.map((item) => ({
			width: item.width * globalWidthScaler,
			height: item.height * globalWidthScaler,
		}))
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
					{sortedRows.map((row, rowIdx) => {
						return (
							<div
								key={`${outfitId}-${rowIdx}`}
								className={styles.outfitRowContainer}
							>
								{row.map((item, itemIdx) => {
									return (
										<img
											key={`${item.Item.itemId}-${item.templateItemId}`}
											src={item.Item.imagePath}
											alt="item-img"
											style={{
												width: `${finalSizes[rowIdx][itemIdx].width}px`,
												height: `${finalSizes[rowIdx][itemIdx].height}px`,
												marginLeft:
													itemIdx !== 0
														? `-${
																finalSizes[
																	rowIdx
																][itemIdx - 1]
																	.width / 2
														  }px`
														: "0px",
											}}
										/>
									);
								})}
							</div>
						);
					})}
				</div>
				<div className={styles.outfitDate}>{dateWorn}</div>
				<div className={styles.outfitDesc}>{desc}</div>
			</Card>
		</>
	);
};

export default OutfitCard;
