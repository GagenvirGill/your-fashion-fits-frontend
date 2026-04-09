"use client";

import { Provider } from "react-redux";
import store from "../src/store/reduxStore";
import ClientShell from "./ClientShell";

export default function RootClientLayout({ children }) {
	return (
		<Provider store={store}>
			<ClientShell>{children}</ClientShell>
		</Provider>
	);
}
