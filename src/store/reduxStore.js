import { configureStore } from "@reduxjs/toolkit";
import outfitTemplateReducer from "./reducers/outfitTemplateReducer.js";
import notificationsReducer from "./reducers/notificationsReducer.js";

const store = configureStore({
	reducer: {
		outfitTemplate: outfitTemplateReducer,
		notifications: notificationsReducer,
	},
});

export default store;
