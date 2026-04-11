import type { ObservationMatrix, WeightedObservation } from "./types";

// Gaussian decay: penalty = 0.5 at 1.5×IQR from median → k = ln(2) / 1.5²
const OUTLIER_K = Math.log(2) / (1.5 * 1.5);
// Half-life = 3× the pair's median observation cadence
const HALF_LIFE_MULTIPLIER = 3;

/**
 * Derives per-pair recency decay lambda from that pair's observation dates.
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
 * Computes Gaussian outlier penalties per pair using IQR.
 * Observations near the median get penalty ≈ 1, dropping exponentially with distance.
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
					if (iqr < 1e-12) return 1;
					const distanceInIqrs = (lr - median) / iqr;
					return Math.exp(-OUTLIER_K * distanceInIqrs * distanceInIqrs);
				})
			);
		}
	}

	return penalties;
};

/**
 * Flattens the observation matrix into weighted observations for the solver.
 * Weight = perPairRecency × perPairOutlierPenalty
 */
export const buildWeightedObservations = (
	matrix: ObservationMatrix
): WeightedObservation[] => {
	const outlierPenalties = computeOutlierPenalties(matrix);
	const weighted: WeightedObservation[] = [];

	for (const idA in matrix) {
		for (const idB in matrix[idA]) {
			const obs = matrix[idA][idB];
			const penalties = outlierPenalties.get(`${idA}:${idB}`)!;

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
					weight: recency * penalties[i],
				});
			}
		}
	}

	return weighted;
};
