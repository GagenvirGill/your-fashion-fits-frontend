import type { Outfit } from "@/types/outfit";
import type { TemplateBox } from "@/jotai/outfit-template-atom";
import type { ObservationMatrix } from "./types";
import { solveGlobalWeights, computeItemCounts } from "./solver";
import { buildWeightedObservations } from "./weighting";
import { computeCategoryPriors, estimateFromPriors } from "./priors";

const DEFAULT_SCALE_VAL = 1;
const FOR_SURE_SCALE_FACTOR = 1.3;
const MIN_ITEM_SCALE = 0.5;
const MAX_ITEM_SCALE = 3;

/** Builds a matrix of all pairwise item weight ratios from outfit history. */
export const createAdjacencyMatrix = (outfits: Outfit[]): ObservationMatrix => {
	const matrix: ObservationMatrix = {};

	for (const outfit of outfits) {
		const date = new Date(outfit.dateWorn);

		for (const row of outfit.OutfitTemplate.TemplateRows) {
			for (const currItemData of row.TemplateItems) {
				const currId = currItemData.Item.itemId;
				const currWeight = currItemData.itemWeight;

				if (!matrix[currId]) matrix[currId] = {};

				for (const innerRow of outfit.OutfitTemplate.TemplateRows) {
					for (const checkItemData of innerRow.TemplateItems) {
						const checkId = checkItemData.Item.itemId;
						const checkWeight = checkItemData.itemWeight;

						if (currId === checkId) continue;

						if (!matrix[currId][checkId]) matrix[currId][checkId] = [];

						matrix[currId][checkId].push({
							ratio: checkWeight / currWeight,
							date,
						});
					}
				}
			}
		}
	}

	return matrix;
};

/** Computes scale values for template items using the weighted solver and category priors. */
const getOutfitsRatios = (
	observationMatrix: ObservationMatrix,
	outfitRows: TemplateBox[][]
): number[][] => {
	if (outfitRows.length === 0) return [];

	const weighted = buildWeightedObservations(observationMatrix);
	const itemCounts = computeItemCounts(observationMatrix);
	const weightMap = solveGlobalWeights(weighted, itemCounts);

	// Build item→categories map from template boxes for prior estimation
	const itemCategories = new Map<string, string[]>();
	for (const row of outfitRows) {
		for (const box of row) {
			if (box.itemId && box.categories.length > 0) {
				itemCategories.set(box.itemId, box.categories);
			}
		}
	}

	const categoryPriors = computeCategoryPriors(weightMap, itemCategories);

	let result = outfitRows.map((row) =>
		row.map((item) => {
			const logWeight = weightMap.get(item.itemId ?? "");
			if (logWeight !== undefined) return Math.exp(logWeight);

			// Bayesian prior: estimate from category averages
			const prior = estimateFromPriors(item.categories, categoryPriors);
			if (prior !== null) return Math.exp(prior);

			return DEFAULT_SCALE_VAL;
		})
	);

	// Clamp to [MIN_ITEM_SCALE, MAX_ITEM_SCALE]
	const flat = result.flat();
	const minVal = Math.min(...flat);
	const maxVal = Math.max(...flat);

	if (minVal < MIN_ITEM_SCALE || maxVal > MAX_ITEM_SCALE) {
		const scale =
			minVal < MIN_ITEM_SCALE
				? MIN_ITEM_SCALE / minVal
				: MAX_ITEM_SCALE / maxVal;
		result = result.map((row) => row.map((v) => v * scale));
	}

	// Normalize to average FOR_SURE_SCALE_FACTOR
	const newFlat = result.flat();
	const sum = newFlat.reduce((a, b) => a + b, 0);
	const avg = sum / newFlat.length;
	const avgScale = FOR_SURE_SCALE_FACTOR / avg;
	result = result.map((row) => row.map((v) => v * avgScale));

	return result;
};

/** Merges new items into template rows and recalculates all scale values. */
export const updateTemplateWithScales = (
	templateRows: TemplateBox[][],
	ratiosMatrix: ObservationMatrix,
	results: { itemId: string; imagePath: string }[][] | TemplateBox[][]
): TemplateBox[][] => {
	const newRows = templateRows.map((row) => [...row]);

	templateRows.forEach((row, rowIdx) => {
		row.forEach((box, boxIdx) => {
			if (results?.[rowIdx]?.[boxIdx]) {
				newRows[rowIdx][boxIdx] = {
					...box,
					itemId: results[rowIdx][boxIdx].itemId,
					imagePath: results[rowIdx][boxIdx].imagePath,
				};
			}
		});
	});

	const newScales = getOutfitsRatios(ratiosMatrix, newRows);

	templateRows.forEach((row, rowIdx) => {
		row.forEach((_, boxIdx) => {
			if (results?.[rowIdx]?.[boxIdx] && newScales[rowIdx]?.[boxIdx] !== undefined) {
				newRows[rowIdx][boxIdx].scale = Number(
					newScales[rowIdx][boxIdx].toFixed(1)
				);
			}
		});
	});

	return newRows;
};
