/**
 * Computes category-level average log-weights from solved item weights.
 * For items with no observations, we fall back to the average weight
 * of items that share their categories.
 */
export const computeCategoryPriors = (
	weightMap: Map<string, number>,
	itemCategories: Map<string, string[]>
): Map<string, number> => {
	const categoryWeights = new Map<string, number[]>();

	for (const [itemId, logWeight] of weightMap) {
		const categories = itemCategories.get(itemId);
		if (!categories) continue;
		for (const cat of categories) {
			if (!categoryWeights.has(cat)) categoryWeights.set(cat, []);
			categoryWeights.get(cat)!.push(logWeight);
		}
	}

	const priors = new Map<string, number>();
	for (const [cat, weights] of categoryWeights) {
		priors.set(cat, weights.reduce((a, b) => a + b, 0) / weights.length);
	}

	return priors;
};

/**
 * Estimates a log-weight for an unknown item based on its categories.
 * Averages the category priors for all categories the item belongs to.
 */
export const estimateFromPriors = (
	categories: string[],
	categoryPriors: Map<string, number>
): number | null => {
	if (categories.length === 0) return null;

	const matchingPriors: number[] = [];
	for (const cat of categories) {
		const prior = categoryPriors.get(cat);
		if (prior !== undefined) matchingPriors.push(prior);
	}

	if (matchingPriors.length === 0) return null;
	return matchingPriors.reduce((a, b) => a + b, 0) / matchingPriors.length;
};
