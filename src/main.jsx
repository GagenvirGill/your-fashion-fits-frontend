// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import App from "./App";
import store from "./store/reduxStore";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);
