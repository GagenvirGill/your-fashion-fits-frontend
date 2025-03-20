// src/store/reducers/itemsReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	refresh: 0,
};

const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload;
		},
		refreshState: (state) => {
			state.refresh += 1;
		},
	},
});

export const { setItems, refreshState } = itemsSlice.actions;
export default itemsSlice.reducer;
