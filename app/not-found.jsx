"use client";

import Welcome from "../src/views/Welcome";
import { useAuth } from "./AuthContext";

export default function NotFound() {
	const { isAuthenticated, setIsAuthenticated } = useAuth();

	return (
		<Welcome
			setIsAuthenticated={setIsAuthenticated}
			isAuthenticated={isAuthenticated}
		/>
	);
}
