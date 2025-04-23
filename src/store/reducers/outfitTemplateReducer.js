// src/store/reducers/outfitTemplateReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	templateRows: [
		[
			{
				boxId: Date.now(),
				itemId: null,
				imagePath: null,
				scale: 1,
				isLocked: false,
				categories: [],
			},
		],
	],
};

const outfitTemplateSlice = createSlice({
	name: "outfitTemplate",
	initialState,
	reducers: {
		setWholeTemplate: (state, action) => {
			const { newTemplate } = action.payload;

			if (newTemplate.length > 0) {
				state.templateRows = newTemplate;
			} else {
				state.templateRows = [
					[
						{
							boxId: Date.now(),
							itemId: null,
							imagePath: null,
							scale: 1,
							isLocked: false,
							categories: [],
						},
					],
				];
			}
		},

		setWholeRow: (state, action) => {
			const { rowIndex, newRow } = action.payload;

			if (rowIndex !== -1) {
				state.templateRows[rowIndex] = newRow;
			}
		},

		setBoxItem: (state, action) => {
			const { rowIndex, boxIndex, itemId, imagePath } = action.payload;

			if (boxIndex !== -1 && rowIndex !== -1) {
				state.templateRows[rowIndex][boxIndex].itemId = itemId;
				state.templateRows[rowIndex][boxIndex].imagePath = imagePath;
			}
		},

		setBoxScale: (state, action) => {
			const { rowIndex, boxIndex, scale } = action.payload;

			if (boxIndex !== -1 && rowIndex !== -1) {
				state.templateRows[rowIndex][boxIndex].scale = scale;
			}
		},

		setBoxLockedStatus: (state, action) => {
			const { rowIndex, boxIndex, isLocked } = action.payload;

			if (boxIndex !== -1 && rowIndex !== -1) {
				state.templateRows[rowIndex][boxIndex].isLocked = isLocked;
			}
		},

		setBoxCategories: (state, action) => {
			const { rowIndex, boxIndex, categories } = action.payload;

			if (boxIndex !== -1 && rowIndex !== -1) {
				state.templateRows[rowIndex][boxIndex].categories = categories;
			}
		},

		addTemplateBoxBefore: (state, action) => {
			const { rowIndex, boxIndex } = action.payload;

			if (boxIndex !== -1 && rowIndex !== -1) {
				state.templateRows[rowIndex].splice(boxIndex, 0, {
					boxId: Date.now(),
					itemId: null,
					imagePath: null,
					scale: 1,
					isLocked: false,
					categories: [],
				});
			}
		},

		addTemplateRowBefore: (state, action) => {
			const { rowIndex } = action.payload;

			if (rowIndex !== -1) {
				state.templateRows.splice(rowIndex, 0, [
					{
						boxId: Date.now(),
						itemId: null,
						imagePath: null,
						scale: 1,
						isLocked: false,
						categories: [],
					},
				]);
			}
		},

		addTemplateBoxAfter: (state, action) => {
			const { rowIndex, boxIndex } = action.payload;

			if (boxIndex !== -1 && rowIndex !== -1) {
				state.templateRows[rowIndex].splice(boxIndex + 1, 0, {
					boxId: Date.now(),
					itemId: null,
					imagePath: null,
					scale: 1,
					isLocked: false,
					categories: [],
				});
			}
		},

		addTemplateRowAfter: (state, action) => {
			const { rowIndex } = action.payload;

			if (rowIndex !== -1) {
				state.templateRows.splice(rowIndex + 1, 0, [
					{
						boxId: Date.now(),
						itemId: null,
						imagePath: null,
						scale: 1,
						isLocked: false,
						categories: [],
					},
				]);
			}
		},

		removeTemplateBox: (state, action) => {
			const { rowIndex, boxIndex } = action.payload;

			if (
				state.templateRows.length === 1 &&
				rowIndex !== -1 &&
				state.templateRows[rowIndex] === 1
			) {
				state.templateRows = [
					[
						{
							boxId: Date.now(),
							itemId: null,
							imagePath: null,
							scale: 1,
							isLocked: false,
							categories: [],
						},
					],
				];
			} else if (boxIndex !== -1 && rowIndex !== -1) {
				if (state.templateRows[rowIndex] === 1) {
					state.templateRows.splice(rowIndex, 1);
				} else {
					state.templateRows[rowIndex].splice(boxIndex, 1);
				}
			}
		},
	},
});

export const {
	setWholeTemplate,
	setWholeRow,
	setBoxItem,
	setBoxScale,
	setBoxLockedStatus,
	setBoxCategories,
	addTemplateBoxBefore,
	addTemplateRowBefore,
	addTemplateBoxAfter,
	addTemplateRowAfter,
	removeTemplateBox,
} = outfitTemplateSlice.actions;
export default outfitTemplateSlice.reducer;
