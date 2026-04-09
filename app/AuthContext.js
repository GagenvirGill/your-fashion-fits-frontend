"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	initialCategState: false,
});

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
