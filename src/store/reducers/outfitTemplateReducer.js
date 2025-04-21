// src/store/reducers/outfitTemplateReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	templateBoxes: [
		{
			boxId: Date.now(),
			itemId: null,
			imagePath: null,
			scale: 1,
			isLocked: false,
			categories: [],
		},
	],
};

const outfitTemplateSlice = createSlice({
	name: "outfitTemplate",
	initialState,
	reducers: {
		setAllBoxes: (state, action) => {
			const { newBoxes } = action.payload;

			if (newBoxes.length > 0) {
				state.templateBoxes = newBoxes;
			} else {
				state.templateBoxes = [
					{
						boxId: Date.now(),
						itemId: null,
						imagePath: null,
						scale: 1,
						isLocked: false,
						categories: [],
					},
				];
			}
		},

		setBoxItem: (state, action) => {
			const { boxIndex, itemId, imagePath } = action.payload;

			if (boxIndex !== -1) {
				state.templateBoxes[boxIndex].itemId = itemId;
				state.templateBoxes[boxIndex].imagePath = imagePath;
			}
		},

		setBoxScale: (state, action) => {
			const { boxIndex, scale } = action.payload;

			if (boxIndex !== -1) {
				state.templateBoxes[boxIndex].scale = scale;
			}
		},

		setBoxLockedStatus: (state, action) => {
			const { boxIndex, isLocked } = action.payload;

			if (boxIndex !== -1) {
				state.templateBoxes[boxIndex].isLocked = isLocked;
			}
		},

		setBoxCategories: (state, action) => {
			const { boxIndex, categories } = action.payload;

			if (boxIndex !== -1) {
				state.templateBoxes[boxIndex].categories = categories;
			}
		},

		addTemplateBoxBefore: (state, action) => {
			const { boxIndex } = action.payload;

			if (boxIndex !== -1) {
				state.templateBoxes.splice(boxIndex, 0, {
					boxId: Date.now(),
					itemId: null,
					imagePath: null,
					scale: 1,
					isLocked: false,
					categories: [],
				});
			}
		},

		addTemplateBoxAfter: (state, action) => {
			const { boxIndex } = action.payload;

			if (boxIndex !== -1) {
				state.templateBoxes.splice(boxIndex + 1, 0, {
					boxId: Date.now(),
					itemId: null,
					imagePath: null,
					scale: 1,
					isLocked: false,
					categories: [],
				});
			}
		},

		removeTemplateBox: (state, action) => {
			if (state.templateBoxes.length === 1) {
				state.templateBoxes = [
					{
						boxId: Date.now(),
						itemId: null,
						imagePath: null,
						scale: 1,
						isLocked: false,
						categories: [],
					},
				];
			} else {
				const { boxIndex } = action.payload;

				if (boxIndex !== -1) {
					state.templateBoxes.splice(boxIndex, 1);
				}
			}
		},
	},
});

export const {
	setAllBoxes,
	setBoxItem,
	setBoxScale,
	setBoxLockedStatus,
	setBoxCategories,
	addTemplateBoxBefore,
	addTemplateBoxAfter,
	removeTemplateBox,
} = outfitTemplateSlice.actions;
export default outfitTemplateSlice.reducer;
