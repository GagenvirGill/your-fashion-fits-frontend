import Queue from "queue";

const DEFAULT_SCALE_VAL = 1;
const FOR_SURE_SCALE_FACTOR = 1.3;
const MIN_ITEM_SCALE = 0.5;
const MAX_ITEM_SCALE = 3;
const indirectCache = {};

export const createAdjacencyMatrix = (outfits) => {
	const adjacencyMatrix = {};

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

						if (currItem.id === checkItem.id) {
							continue;
						}

						const ratio = checkItem.weight / currItem.weight;

						if (
							!adjacencyMatrix[currItem.id][checkItem.id] ||
							date >
								adjacencyMatrix[currItem.id][checkItem.id].date
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

	for (const idA in adjacencyMatrix) {
		for (const idB in adjacencyMatrix[idA]) {
			adjacencyMatrix[idA][idB] = adjacencyMatrix[idA][idB].value;
		}
	}

	return adjacencyMatrix;
};

const getOutfitsRatios = (adjacencyMatrix, outfitRows) => {
	if (outfitRows.length === 0) {
		return [];
	}

	let refId;
	for (const row of outfitRows) {
		for (const item of row) {
			if (adjacencyMatrix[item.itemId]) {
				refId = item.itemId;
				break;
			}
		}
	}

	let result = outfitRows.map((row) => {
		if (row.length === 0) {
			return [];
		}

		return row.map((item) => {
			if (!refId || item.itemId === refId) {
				return DEFAULT_SCALE_VAL;
			}

			const ratio = getRatio(adjacencyMatrix, item.itemId, refId);

			if (!ratio) {
				return DEFAULT_SCALE_VAL;
			} else {
				return 1 / ratio;
			}
		});
	});

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

	const newFlat = result.flat();
	const sum = newFlat.reduce((a, b) => a + b, 0);
	const avg = sum / newFlat.length;
	const avgScale = FOR_SURE_SCALE_FACTOR / avg;
	result = result.map((row) => row.map((v) => v * avgScale));

	return result;
};

const getRatio = (adjacencyMatrix, start, end, maxDepth = 7) => {
	const key = `${start}:${end}`;

	if (indirectCache[key]) {
		return indirectCache[key];
	}

	if (adjacencyMatrix[start] && adjacencyMatrix[start][end]) {
		indirectCache[key] = adjacencyMatrix[start][end];
		return indirectCache[key];
	}

	const q = new Queue({ concurrency: 1, autostart: false });
	q.push([start, 1]);

	const visitedDepth = {};
	visitedDepth[start] = 0;
	let paths = [];
	let depth = 0;

	while (q.length > 0 && depth < maxDepth) {
		const currentLevel = q.length;

		for (let i = 0; i < currentLevel; i++) {
			const [current, ratioSoFar] = q.shift();
			const neighbours = adjacencyMatrix[current] || {};

			for (const neighbour in neighbours) {
				const newRatio = ratioSoFar * neighbours[neighbour];

				if (neighbour === end) {
					paths.push(newRatio);
				}

				if (
					visitedDepth[neighbour] === undefined ||
					visitedDepth[neighbour] > depth
				) {
					visitedDepth[neighbour] = depth;
					q.push([neighbour, newRatio]);
				}
			}
		}

		depth++;
	}

	const result =
		paths.length > 0
			? paths.reduce((sum, val) => sum + val, 0) / paths.length
			: null;

	indirectCache[key] = result;
	return result;
};

export const updateTemplateWithScales = (
	templateRows,
	ratiosMatrix,
	results
) => {
	const newRows = templateRows.map((row) => [...row]);

	templateRows.forEach((row, rowIdx) => {
		row.forEach((box, boxIdx) => {
			if (results && results[rowIdx] && results[rowIdx][boxIdx]) {
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
		row.forEach((box, boxIdx) => {
			if (results && results[rowIdx] && results[rowIdx][boxIdx]) {
				newRows[rowIdx][boxIdx].scale = newScales[rowIdx][boxIdx];
			}
		});
	});

	return newRows;
};
