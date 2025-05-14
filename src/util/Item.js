export const sortItems = (outfits, items, sortOption) => {
	switch (sortOption) {
		case "lastWornDateAsc":
			return sortLastWornDateASC(outfits, items);
		case "lastWornDateDesc":
			return sortLastWornDateDESC(outfits, items);
		case "amountWornAsc":
			return sortAmountWornASC(outfits, items);
		case "amountWornDesc":
			return sortAmountWornDESC(outfits, items);
		case "none":
			return items;
		default:
			return items;
	}
};

const sortLastWornDateASC = (outfits, items) => {
	const lastWornMap = getLastWornMap(outfits);

	const sortedItems = [...items].sort((a, b) => {
		const dateA = lastWornMap.get(a.itemId) || new Date(0);
		const dateB = lastWornMap.get(b.itemId) || new Date(0);

		return dateA - dateB;
	});

	return sortedItems;
};

const sortLastWornDateDESC = (outfits, items) => {
	const lastWornMap = getLastWornMap(outfits);

	const sortedItems = [...items].sort((a, b) => {
		const dateA = lastWornMap.get(a.itemId) || new Date(0);
		const dateB = lastWornMap.get(b.itemId) || new Date(0);

		return dateB - dateA;
	});

	return sortedItems;
};

const sortAmountWornASC = (outfits, items) => {
	const wearCountMap = getWearCountMap(outfits);

	const sortedItems = [...items].sort((a, b) => {
		const countA = wearCountMap.get(a.itemId) || 0;
		const countB = wearCountMap.get(b.itemId) || 0;

		return countA - countB;
	});

	return sortedItems;
};

const sortAmountWornDESC = (outfits, items) => {
	const wearCountMap = getWearCountMap(outfits);

	const sortedItems = [...items].sort((a, b) => {
		const countA = wearCountMap.get(a.itemId) || 0;
		const countB = wearCountMap.get(b.itemId) || 0;

		return countB - countA;
	});

	return sortedItems;
};

const getLastWornMap = (outfits) => {
	const dateWornMap = new Map();

	outfits.forEach((outfit) => {
		const outfitDateWorn = new Date(outfit.dateWorn);

		outfit.OutfitTemplate.TemplateRows.forEach((row) => {
			row.TemplateItems.forEach((item) => {
				const itemId = item.Item.itemId;

				if (
					!dateWornMap.has(itemId) ||
					dateWornMap.get(itemId) < outfitDateWorn
				) {
					dateWornMap.set(itemId, outfitDateWorn);
				}
			});
		});
	});

	return dateWornMap;
};

const getWearCountMap = (outfits) => {
	const wearCountMap = new Map();

	outfits.forEach((outfit) => {
		outfit.OutfitTemplate.TemplateRows.forEach((row) => {
			row.TemplateItems.forEach((item) => {
				const itemId = item.Item.itemId;
				wearCountMap.set(itemId, (wearCountMap.get(itemId) || 0) + 1);
			});
		});
	});

	return wearCountMap;
};
