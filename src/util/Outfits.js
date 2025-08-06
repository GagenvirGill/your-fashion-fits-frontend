export const filterOutfitsByItem = (outfits, itemIds) => {
	const itemIdSet = new Set(itemIds);

	return outfits.filter((outfit) => {
		return outfit.OutfitTemplate.TemplateRows.some((row) =>
			row.TemplateItems.some((item) => itemIdSet.has(item.Item.itemId))
		);
	});
};
