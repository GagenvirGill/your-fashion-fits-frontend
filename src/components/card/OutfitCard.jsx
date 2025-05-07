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

	const rowMinScales = [];
	const rowMaxHeights = [];

	const rowSizes = sortedRows.map((row) => {
		const rowWeightSum = row.reduce(
			(sum, item) => sum + item.itemWeight,
			0
		);

		const imageRects = row.map((item) => {
			const baseWidth =
				((MAX_CARD_WIDTH * (item.itemWeight / rowWeightSum)) /
					item.Item.imageWidth) *
				item.Item.imageWidth;
			const baseHeight =
				baseWidth * (item.Item.imageHeight / item.Item.imageWidth);

			return {
				width: baseWidth,
				height: baseHeight,
			};
		});

		const rowMaxWeight = Math.max(...row.map((item) => item.itemWeight));
		const rowHeight = (rowMaxWeight / totalWeight) * MAX_CARD_HEIGHT;

		const rowMaxImgHeight = Math.max(
			...imageRects.map((dim) => dim.height)
		);
		rowMaxHeights.push(rowMaxImgHeight);

		const rowMinScale = rowMaxImgHeight / rowHeight;
		rowMinScales.push(rowMinScale);

		return imageRects;
	});

	const globalWidthScaler = Math.min(...rowMinScales);

	const widthScaledHeight = rowMaxHeights
		.map(
			(height, rowIdx) =>
				(height / rowMinScales[rowIdx]) * globalWidthScaler
		)
		.reduce((sum, val) => sum + val, 0);

	const globalHeightScaler = Math.min(1, MAX_CARD_HEIGHT / widthScaledHeight);

	const finalSizes = rowSizes.map((row, rowIdx) =>
		row.map((item) => ({
			width:
				(item.width / rowMinScales[rowIdx]) *
				globalWidthScaler *
				globalHeightScaler,
			height:
				(item.height / rowMinScales[rowIdx]) *
				globalWidthScaler *
				globalHeightScaler,
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
