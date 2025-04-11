import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../store/reducers/outfitsReducer";

import styles from "./OutfitCard.module.css";
import { deleteOutfit } from "../../api/Outfit";

import Card from "./Card";

const OutfitCard = ({ outfitId, dateWorn, description, items }) => {
	const dispatch = useDispatch();
	const [aspectRatios, setAspectRatios] = useState({});

	const onDelete = () => {
		deleteOutfit(outfitId).then(() => {
			dispatch(refreshState());
		});
	};

	const handleImageLoad = (e, id) => {
		const { naturalWidth, naturalHeight } = e.target;
		const ratio = naturalHeight / naturalWidth;

		setAspectRatios((prev) => ({
			...prev,
			[id]: ratio,
		}));
	};

	const totalRatio = Object.values(aspectRatios).reduce(
		(acc, r) => acc + r,
		0
	);

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
					{sortedItems.map((item) => {
						const id = `${item.templateItemId}-${item.Item.itemId}`;
						const thisRatio = aspectRatios[id];

						const maxHeight =
							thisRatio && totalRatio
								? `${(thisRatio / totalRatio) * 100}%`
								: "0px";

						return (
							<img
								key={id}
								src={`http://localhost:5001${item.Item.imagePath}`}
								alt="item-img"
								onLoad={(e) => handleImageLoad(e, id)}
								style={{
									maxHeight,
									maxWidth: "100%",
									objectFit: "contain",
									display: thisRatio ? "block" : "none",
								}}
							/>
						);
					})}
				</div>
				<p className={styles.outfitDate}>{dateWorn}</p>
				<p className={styles.outfitDesc}>{description}</p>
			</Card>
		</>
	);
};

export default OutfitCard;
