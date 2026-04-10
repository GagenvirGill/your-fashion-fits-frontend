"use client";

import Navbar from "../src/components/nav/Navbar";
import Notifications from "../src/components/notifications/Notifications";

export default function ClientShell({ children }) {
	return (
		<>
			<Navbar />
			<Notifications />
			{children}
		</>
	);
}
