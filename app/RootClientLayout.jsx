"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "../src/store/reduxStore";
import ClientShell from "./ClientShell";

export default function RootClientLayout({ children }) {
	return (
		<SessionProvider>
			<Provider store={store}>
				<ClientShell>{children}</ClientShell>
			</Provider>
		</SessionProvider>
	);
}
