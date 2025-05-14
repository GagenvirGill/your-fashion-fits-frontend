export const filterOutfitsByItem = (outfits, itemId) => {
	return outfits.filter((outfit) => {
		return outfit.OutfitTemplate.TemplateRows.some((row) =>
			row.TemplateItems.some((item) => item.Item.itemId === itemId)
		);
	});
};
