// src/store/reducers/outfitsReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	outfits: [],
	refresh: 0,
};

const outfitsSlice = createSlice({
	name: "outfits",
	initialState,
	reducers: {
		setOutfits: (state, action) => {
			state.outfits = action.payload;
		},
		refreshState: (state) => {
			state.refresh += 1;
		},
	},
});

export const { setOutfits, refreshState } = outfitsSlice.actions;
export default outfitsSlice.reducer;
