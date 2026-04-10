"use client";

import { SessionProvider } from "next-auth/react";
import ReduxProvider from "./ReduxProvider";
import ClientShell from "./ClientShell";

export default function RootClientLayout({ children }) {
	return (
		<SessionProvider>
			<ReduxProvider>
				<ClientShell>{children}</ClientShell>
			</ReduxProvider>
		</SessionProvider>
	);
}
