// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./reducers/itemsReducer.js";
import categoriesReducer from "./reducers/categoriesReducer.js";
import outfitsReducer from "./reducers/outfitsReducer.js";
import outfitTemplateReducer from "./reducers/outfitTemplateReducer.js";
import notificationsReducer from "./reducers/notificationsReducer.js";

const store = configureStore({
	reducer: {
		items: itemsReducer,
		categories: categoriesReducer,
		outfits: outfitsReducer,
		outfitTemplate: outfitTemplateReducer,
		notifications: notificationsReducer,
	},
});

export default store;
