// src/store/reducers/categoriesReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	categories: [],
	refresh: 0,
	reload: 0,
};

const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload;
		},
		refreshState: (state) => {
			state.refresh += 1;
		},
		reloadState: (state) => {
			state.reload += 1;
		},
	},
});

export const { setCategories, refreshState, reloadState } =
	categoriesSlice.actions;
export default categoriesSlice.reducer;
