import type { ObservationMatrix, WeightedObservation } from "./types";

/**
 * Counts total observations per item across all pairings.
 * Reflects how well-known an item is overall — an item in 20 outfits
 * with different partners is well-established even if each pairing happened once.
 */
export const computeItemCounts = (matrix: ObservationMatrix): Map<string, number> => {
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
 * Solves the system ATA * x = ATb via Gaussian elimination with partial pivoting.
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
export const solveGlobalWeights = (
	observations: WeightedObservation[],
	itemCounts: Map<string, number>
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

		// Per-item count factor: geometric mean of both items' observation counts
		const countA = itemCounts.get(obs.idA) ?? 1;
		const countB = itemCounts.get(obs.idB) ?? 1;
		const countFactor = Math.log(1 + Math.sqrt(countA * countB));

		// Final weight: item-level count × pair-level (recency × outlier)
		const w = countFactor * obs.weight;

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
