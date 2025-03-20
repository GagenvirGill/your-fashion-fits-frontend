// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./reducers/itemsReducer.js";
import categoriesReducer from "./reducers/categoriesReducer.js";

const store = configureStore({
	reducer: {
		items: itemsReducer,
		categories: categoriesReducer,
	},
});

export default store;
