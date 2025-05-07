// src/store/reducers/notificationsReducer.js
import { createSlice } from "@reduxjs/toolkit";

let idCounter = 1;
const initialState = { notifications: [] };

const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		addNotification: {
			reducer(state, action) {
				state.notifications.push(action.payload);
			},
			prepare(message) {
				return {
					payload: {
						id: idCounter++,
						message,
					},
				};
			},
		},
		removeNotification(state, action) {
			state.notifications = state.notifications.filter(
				(n) => n.id !== action.payload
			);
		},
	},
});

export const { addNotification, removeNotification } =
	notificationsSlice.actions;
export default notificationsSlice.reducer;
