export interface PairObservation {
	ratio: number;
	date: Date;
}

export type ObservationMatrix = Record<string, Record<string, PairObservation[]>>;

export interface WeightedObservation {
	idA: string;
	idB: string;
	logRatio: number;
	weight: number;
}
