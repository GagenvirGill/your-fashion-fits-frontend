// src/store/reducers/itemsReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	loading: false,
};

const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { setItems, setLoading } = itemsSlice.actions;
export default itemsSlice.reducer;
