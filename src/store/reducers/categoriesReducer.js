// src/store/reducers/categoriesReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	categories: [],
	refresh: 0,
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
	},
});

export const { setCategories, refreshState } = categoriesSlice.actions;
export default categoriesSlice.reducer;
