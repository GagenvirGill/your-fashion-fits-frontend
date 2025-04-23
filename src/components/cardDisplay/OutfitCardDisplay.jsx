import React from "react";
import { useSelector } from "react-redux";
import styles from "./CardDisplayStyles.module.css";

import OutfitCard from "../card/OutfitCard";

const OutfitCardDisplay = () => {
	const { outfits } = useSelector((state) => state.outfits);

	return (
		<div className={styles.cardDisplay}>
			{outfits.map((outfit) => {
				return (
					<OutfitCard
						key={`${outfit.outfitId}.card`}
						outfitId={outfit.outfitId}
						dateWorn={outfit.dateWorn}
						desc={outfit.description}
						items={outfit.OutfitTemplate.TemplateRows}
						totalWeight={outfit.OutfitTemplate.totalWeight}
					/>
				);
			})}
		</div>
	);
};

export default OutfitCardDisplay;
