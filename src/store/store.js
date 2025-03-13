// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./reducers/itemsReducer.js";

const store = configureStore({
	reducer: {
		items: itemsReducer,
	},
});

export default store;
