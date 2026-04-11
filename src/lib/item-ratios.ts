import type { Outfit } from "@/types/outfit";
import type { TemplateBox } from "@/jotai/outfit-template-atom";

const DEFAULT_SCALE_VAL = 1;
const FOR_SURE_SCALE_FACTOR = 1.3;
const MIN_ITEM_SCALE = 0.5;
const MAX_ITEM_SCALE = 3;

// Gaussian decay: penalty = 0.5 at 1.5×IQR from median → k = ln(2) / 1.5²
const OUTLIER_K = Math.log(2) / (1.5 * 1.5);
// Half-life = 3× the user's median outfit cadence
const HALF_LIFE_MULTIPLIER = 3;

// --- Types ---

interface PairObservation {
	ratio: number;
	date: Date;
}

type ObservationMatrix = Record<string, Record<string, PairObservation[]>>;

interface WeightedObservation {
	idA: string;
	idB: string;
	logRatio: number;
	weight: number;
}

// --- Linear Algebra Solver ---

/**
 * Solves the system ATA * x = ATb via Gaussian elimination with partial pivoting.
 * ATA is n×n, ATb is n-length. Returns n-length solution vector.
 */
const solveNormalEquations = (ATA: number[][], ATb: number[]): number[] => {
	const n = ATA.length;
	const aug: number[][] = ATA.map((row, i) => [...row, ATb[i]]);

	for (let col = 0; col < n; col++) {
		let maxVal = Math.abs(aug[col][col]);
		let maxRow = col;
		for (let row = col + 1; row < n; row++) {
			if (Math.abs(aug[row][col]) > maxVal) {
				maxVal = Math.abs(aug[row][col]);
				maxRow = row;
			}
		}

		if (maxRow !== col) {
			[aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];
		}

		if (Math.abs(aug[col][col]) < 1e-12) continue;

		for (let row = col + 1; row < n; row++) {
			const factor = aug[row][col] / aug[col][col];
			for (let j = col; j <= n; j++) {
				aug[row][j] -= factor * aug[col][j];
			}
		}
	}

	const x = new Array(n).fill(0);
	for (let i = n - 1; i >= 0; i--) {
		if (Math.abs(aug[i][i]) < 1e-12) {
			x[i] = 0;
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
 * Solves for global log-weights from weighted pairwise observations.
 * Each observation: log(w_idA) - log(w_idB) = logRatio, with importance weight.
 * Pins the first item to 0 to remove the degree of freedom.
 */
const solveGlobalWeights = (
	observations: WeightedObservation[]
): Map<string, number> => {
	const result = new Map<string, number>();
	if (observations.length === 0) return result;

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

	const n = totalItems - 1;
	const ATA: number[][] = Array.from({ length: n }, () =>
		new Array(n).fill(0)
	);
	const ATb: number[] = new Array(n).fill(0);

	for (const obs of observations) {
		const iA = itemIndex.get(obs.idA)!;
		const iB = itemIndex.get(obs.idB)!;
		const w = obs.weight;

		const row = new Array(n).fill(0);
		if (iA !== 0) row[iA - 1] = 1;
		if (iB !== 0) row[iB - 1] = -1;

		for (let i = 0; i < n; i++) {
			if (row[i] === 0) continue;
			ATb[i] += w * row[i] * obs.logRatio;
			for (let j = 0; j < n; j++) {
				if (row[j] === 0) continue;
				ATA[i][j] += w * row[i] * row[j];
			}
		}
	}

	const x = solveNormalEquations(ATA, ATb);

	result.set(itemIds[0], 0);
	for (let i = 0; i < n; i++) {
		result.set(itemIds[i + 1], x[i]);
	}

	return result;
};

// --- Observation Weighting ---

/**
 * Derives per-pair recency decay lambda from that pair's observation dates.
 * Half-life = HALF_LIFE_MULTIPLIER × median days between that pair's observations.
 * Decay is relative to the pair's most recent observation, not "now".
 */
const computePairRecency = (pairDates: Date[]): { lambda: number; mostRecent: number } => {
	const sorted = [...pairDates].sort((a, b) => a.getTime() - b.getTime());
	const mostRecent = sorted[sorted.length - 1].getTime();

	if (sorted.length < 2) return { lambda: 0, mostRecent };

	const gaps: number[] = [];
	for (let i = 1; i < sorted.length; i++) {
		const daysDiff =
			(sorted[i].getTime() - sorted[i - 1].getTime()) / (1000 * 60 * 60 * 24);
		if (daysDiff > 0) gaps.push(daysDiff);
	}

	if (gaps.length === 0) return { lambda: 0, mostRecent };

	gaps.sort((a, b) => a - b);
	const medianGap = gaps[Math.floor(gaps.length / 2)];
	const halfLife = medianGap * HALF_LIFE_MULTIPLIER;

	return { lambda: Math.log(2) / halfLife, mostRecent };
};

/**
 * Computes IQR-based outlier penalties for each pair's observations.
 * Returns a Map from "idA:idB" to an array of penalties (one per observation).
 */
const computeOutlierPenalties = (
	matrix: ObservationMatrix
): Map<string, number[]> => {
	const penalties = new Map<string, number[]>();

	for (const idA in matrix) {
		for (const idB in matrix[idA]) {
			const obs = matrix[idA][idB];
			const key = `${idA}:${idB}`;

			if (obs.length < 4) {
				// Too few observations for meaningful IQR — trust them all
				penalties.set(key, obs.map(() => 1));
				continue;
			}

			const logRatios = obs.map((o) => Math.log(o.ratio)).sort((a, b) => a - b);
			const q1 = logRatios[Math.floor(logRatios.length * 0.25)];
			const q3 = logRatios[Math.floor(logRatios.length * 0.75)];
			const iqr = q3 - q1;
			const median = logRatios[Math.floor(logRatios.length / 2)];

			penalties.set(
				key,
				obs.map((o) => {
					const lr = Math.log(o.ratio);
					if (iqr < 1e-12) return 1; // all observations are identical
					const distanceInIqrs = (lr - median) / iqr;
					return Math.exp(-OUTLIER_K * distanceInIqrs * distanceInIqrs);
				})
			);
		}
	}

	return penalties;
};

/**
 * Counts total observations per item across all pairings.
 * An item in 20 outfits with different partners is well-known,
 * even if each specific pairing only happened once.
 */
const computeItemCounts = (matrix: ObservationMatrix): Map<string, number> => {
	const counts = new Map<string, number>();
	for (const idA in matrix) {
		for (const idB in matrix[idA]) {
			const n = matrix[idA][idB].length;
			counts.set(idA, (counts.get(idA) ?? 0) + n);
			counts.set(idB, (counts.get(idB) ?? 0) + n);
		}
	}
	return counts;
};

/**
 * Flattens the observation matrix into weighted observations for the solver.
 * Combined weight = itemCountFactor × perPairRecency × perPairOutlierPenalty
 *   - Count: per-item (how well-known is this item overall)
 *   - Recency: per-pair (is this pairing's data still fresh)
 *   - Outlier: per-pair (is this observation weird for this pairing)
 */
const buildWeightedObservations = (
	matrix: ObservationMatrix
): WeightedObservation[] => {
	const outlierPenalties = computeOutlierPenalties(matrix);
	const itemCounts = computeItemCounts(matrix);
	const weighted: WeightedObservation[] = [];

	for (const idA in matrix) {
		for (const idB in matrix[idA]) {
			const obs = matrix[idA][idB];
			const penalties = outlierPenalties.get(`${idA}:${idB}`)!;

			// Per-item count: average of both items' counts (geometric mean in log-space)
			const countA = itemCounts.get(idA) ?? 1;
			const countB = itemCounts.get(idB) ?? 1;
			const countFactor = Math.log(1 + Math.sqrt(countA * countB));

			// Per-pair recency: decay relative to this pair's most recent observation
			const pairDates = obs.map((o) => o.date);
			const { lambda, mostRecent } = computePairRecency(pairDates);

			for (let i = 0; i < obs.length; i++) {
				const daysSince =
					(mostRecent - obs[i].date.getTime()) / (1000 * 60 * 60 * 24);
				const recency = Math.exp(-lambda * daysSince);

				weighted.push({
					idA,
					idB,
					logRatio: Math.log(obs[i].ratio),
					weight: countFactor * recency * penalties[i],
				});
			}
		}
	}

	return weighted;
};

// --- Public API ---

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

const getOutfitsRatios = (
	observationMatrix: ObservationMatrix,
	outfitRows: TemplateBox[][]
): number[][] => {
	if (outfitRows.length === 0) return [];

	const weighted = buildWeightedObservations(observationMatrix);
	const weightMap = solveGlobalWeights(weighted);

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
