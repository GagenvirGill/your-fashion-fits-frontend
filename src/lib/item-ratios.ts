import type { Outfit } from "@/types/outfit";
import type { TemplateBox } from "@/jotai/outfit-template-atom";

const DEFAULT_SCALE_VAL = 1;
const FOR_SURE_SCALE_FACTOR = 1.3;
const MIN_ITEM_SCALE = 0.5;
const MAX_ITEM_SCALE = 3;

// --- Types ---

type AdjacencyMatrix = Record<string, Record<string, number>>;

interface Observation {
	idA: string;
	idB: string;
	logRatio: number;
}

// --- Linear Algebra Solver ---

/**
 * Solves the system ATA * x = ATb via Gaussian elimination with partial pivoting.
 * ATA is n×n, ATb is n-length. Returns n-length solution vector.
 */
const solveNormalEquations = (ATA: number[][], ATb: number[]): number[] => {
	const n = ATA.length;
	// Build augmented matrix [ATA | ATb]
	const aug: number[][] = ATA.map((row, i) => [...row, ATb[i]]);

	// Forward elimination with partial pivoting
	for (let col = 0; col < n; col++) {
		// Find pivot
		let maxVal = Math.abs(aug[col][col]);
		let maxRow = col;
		for (let row = col + 1; row < n; row++) {
			if (Math.abs(aug[row][col]) > maxVal) {
				maxVal = Math.abs(aug[row][col]);
				maxRow = row;
			}
		}

		// Swap rows
		if (maxRow !== col) {
			[aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];
		}

		// Skip if pivot is effectively zero (disconnected component)
		if (Math.abs(aug[col][col]) < 1e-12) {
			continue;
		}

		// Eliminate below
		for (let row = col + 1; row < n; row++) {
			const factor = aug[row][col] / aug[col][col];
			for (let j = col; j <= n; j++) {
				aug[row][j] -= factor * aug[col][j];
			}
		}
	}

	// Back substitution
	const x = new Array(n).fill(0);
	for (let i = n - 1; i >= 0; i--) {
		if (Math.abs(aug[i][i]) < 1e-12) {
			x[i] = 0; // disconnected item — will get DEFAULT_SCALE_VAL
			continue;
		}
		let sum = aug[i][n];
		for (let j = i + 1; j < n; j++) {
			sum -= aug[i][j] * x[j];
		}
		x[i] = sum / aug[i][i];
	}

	return x;
};

/**
 * Solves for global log-weights from pairwise observations.
 * Each observation: log(w_idA) - log(w_idB) = logRatio.
 * Pins the first item to 0 to remove the degree of freedom.
 * Returns Map<itemId, logWeight>.
 */
const solveGlobalWeights = (
	observations: Observation[]
): Map<string, number> => {
	const result = new Map<string, number>();
	if (observations.length === 0) return result;

	// Assign each unique item an index
	const itemIds: string[] = [];
	const itemIndex = new Map<string, number>();
	for (const obs of observations) {
		if (!itemIndex.has(obs.idA)) {
			itemIndex.set(obs.idA, itemIds.length);
			itemIds.push(obs.idA);
		}
		if (!itemIndex.has(obs.idB)) {
			itemIndex.set(obs.idB, itemIds.length);
			itemIds.push(obs.idB);
		}
	}

	const totalItems = itemIds.length;
	if (totalItems <= 1) {
		for (const id of itemIds) result.set(id, 0);
		return result;
	}

	// Pin item 0 to weight 0 — solve for items 1..n-1
	const n = totalItems - 1; // number of unknowns
	const m = observations.length; // number of equations

	// Build A (m × n) and b (m) directly into normal equations
	// A[row][col]: for observation row, col maps to item index - 1 (since item 0 is pinned)
	// Instead of building full A matrix, form ATA and ATb directly for efficiency
	const ATA: number[][] = Array.from({ length: n }, () =>
		new Array(n).fill(0)
	);
	const ATb: number[] = new Array(n).fill(0);

	for (const obs of observations) {
		const iA = itemIndex.get(obs.idA)!;
		const iB = itemIndex.get(obs.idB)!;

		// Equation: x_iA - x_iB = logRatio
		// In reduced system (pinned item 0 removed):
		// If iA === 0: -x_iB = logRatio → coefficient for iB-1 is -1
		// If iB === 0: x_iA = logRatio → coefficient for iA-1 is +1
		// Otherwise: x_(iA-1) - x_(iB-1) = logRatio

		// Build the row coefficients for the reduced system
		const row = new Array(n).fill(0);
		if (iA !== 0) row[iA - 1] = 1;
		if (iB !== 0) row[iB - 1] = -1;

		// Accumulate into ATA and ATb
		for (let i = 0; i < n; i++) {
			if (row[i] === 0) continue;
			ATb[i] += row[i] * obs.logRatio;
			for (let j = 0; j < n; j++) {
				if (row[j] === 0) continue;
				ATA[i][j] += row[i] * row[j];
			}
		}
	}

	const x = solveNormalEquations(ATA, ATb);

	// Item 0 has logWeight = 0 (pinned)
	result.set(itemIds[0], 0);
	for (let i = 0; i < n; i++) {
		result.set(itemIds[i + 1], x[i]);
	}

	return result;
};

// --- Public API ---

export const createAdjacencyMatrix = (outfits: Outfit[]): AdjacencyMatrix => {
	const adjacencyMatrix: Record<string, Record<string, { value: number; date: Date }>> = {};

	for (const outfit of outfits) {
		const date = new Date(outfit.dateWorn);

		for (const row of outfit.OutfitTemplate.TemplateRows) {
			for (const currItemData of row.TemplateItems) {
				const currItem = {
					id: currItemData.Item.itemId,
					weight: currItemData.itemWeight,
				};

				if (!adjacencyMatrix[currItem.id]) {
					adjacencyMatrix[currItem.id] = {};
				}

				for (const innerRow of outfit.OutfitTemplate.TemplateRows) {
					for (const checkItemData of innerRow.TemplateItems) {
						const checkItem = {
							id: checkItemData.Item.itemId,
							weight: checkItemData.itemWeight,
						};

						if (currItem.id === checkItem.id) continue;

						const ratio = checkItem.weight / currItem.weight;

						if (
							!adjacencyMatrix[currItem.id][checkItem.id] ||
							date > adjacencyMatrix[currItem.id][checkItem.id].date
						) {
							adjacencyMatrix[currItem.id][checkItem.id] = {
								value: ratio,
								date,
							};
						}
					}
				}
			}
		}
	}

	// Collapse to scalar ratios (Phase 2 will change this to keep all observations)
	const result: AdjacencyMatrix = {};
	for (const idA in adjacencyMatrix) {
		result[idA] = {};
		for (const idB in adjacencyMatrix[idA]) {
			result[idA][idB] = adjacencyMatrix[idA][idB].value;
		}
	}

	return result;
};

const getOutfitsRatios = (
	adjacencyMatrix: AdjacencyMatrix,
	outfitRows: TemplateBox[][]
): number[][] => {
	if (outfitRows.length === 0) return [];

	// Flatten adjacency matrix into observations for the solver
	const observations: Observation[] = [];
	for (const idA in adjacencyMatrix) {
		for (const idB in adjacencyMatrix[idA]) {
			observations.push({
				idA,
				idB,
				logRatio: Math.log(adjacencyMatrix[idA][idB]),
			});
		}
	}

	const weightMap = solveGlobalWeights(observations);

	// Compute scales from global weights
	let result = outfitRows.map((row) =>
		row.map((item) => {
			const logWeight = weightMap.get(item.itemId ?? "");
			if (logWeight === undefined) return DEFAULT_SCALE_VAL;
			return Math.exp(logWeight);
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

export const updateTemplateWithScales = (
	templateRows: TemplateBox[][],
	ratiosMatrix: AdjacencyMatrix,
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
